import IProduct from "@/interfaces/IProduct";

export default function Home({ products }: { products: IProduct[] }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          {product.name}
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`);
  const products: IProduct[] = res.ok ? await res.json() : [];
  
  return { props: { products } };
}
