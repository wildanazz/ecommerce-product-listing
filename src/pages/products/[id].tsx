import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import IProduct from '@/interfaces/IProduct';
import { getProductsFromAPI } from '@/lib/load-products';

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
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">

            {/* Product Image */}
            <div className="relative w-full h-[500px] shadow-md rounded overflow-hidden border">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="bg-white"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-700 text-lg">{product.description}</p>
              <div className="text-xl font-semibold text-green-700">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 space-y-1 pt-4 border-t">
                <p><strong>SKU:</strong> {product.sku || 'N/A'}</p>
                <p>
                  <strong>Availability:</strong>{' '}
                  <span className={product.available ? 'text-green-600' : 'text-red-600'}>
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
              </div>
            </div>
          </div>
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