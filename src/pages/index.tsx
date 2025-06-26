import IProduct from "@/interfaces/IProduct";
import { ProductCard } from "@/components/ProductCard";

/**
 * Home Page Component
 *
 * Renders a list of products in a responsive grid using the `ProductCard` component.
 *
 * @param {Object} props
 * @param {IProduct[]} props.products - List of products to display
 */
export default function Home({ products }: { products: IProduct[] }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`);
  const products: IProduct[] = res.ok ? await res.json() : [];
  
  return { props: { products } };
}
