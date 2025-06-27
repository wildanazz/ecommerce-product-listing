import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import IProduct from '@/interfaces/IProduct';
import { getProductsFromAPI } from '@/lib/load-products';

export default function ProductDetail({ product }: { product: IProduct }) {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="relative w-full h-80 mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg">
        <strong>Price:</strong> ${product.price}
      </p>
    </div>
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