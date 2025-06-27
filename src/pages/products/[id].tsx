import { GetStaticPaths, GetStaticProps } from 'next';

import IProduct from '@/interfaces/IProduct';
import { getProductsFromAPI } from '@/lib/load-products';

export default function ProductDetail({ product }: { product: IProduct }) {
  return (
    <div>{product.name}</div>
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