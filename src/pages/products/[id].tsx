import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import IProduct from '@/interfaces/IProduct';
import { getProductsFromAPI } from '@/lib/load-products';
import ProductCardDetail from '@/components/ProductCardDetail';

export default function ProductDetail({ product }: { product: IProduct }) {
  return (
    <main className="flex flex-col items-start pt-24 px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 overflow-hidden">

      {/* Back Button */}
      <Link legacyBehavior href="/">
        <a className="absolute top-4 left-4 text-black hover:text-black transition font-medium">
          &larr; Back to Products
        </a>
      </Link>

      <div className="my-14 lg:my-32 font-light w-full text-black dark:text-white">
        <ProductCardDetail product={product} />
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProductsFromAPI()

  const paths = products.map((product) => ({
    params: { id: product.id.toString() }
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!;

  const products = await getProductsFromAPI();

  const product = products.find((p) => p.id.toString() === id);

  return { 
    props: { 
      product 
    }, 
    revalidate: 60 // Rebuild the page every 60 seconds
  };
};