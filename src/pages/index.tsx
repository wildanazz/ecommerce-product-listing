import IProduct from "@/interfaces/IProduct";
import { useEffect, useState } from 'react';

import { ProductCard } from "@/components/ProductCard";
import { Dropdown } from '@/components/Dropdown';

/**
 * Home Page Component
 *
 * Renders a list of products in a responsive grid using the `ProductCard` component.
 *
 * @param {Object} props
 * @param {IProduct[]} props.products - List of products to display
 */
export default function Home({ products }: { products: IProduct[] }) {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
  const categories = Array.from(new Set(products.map(product => product.category)))

  const fetchProducts = async (category: string, sort: string) => { 
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (sort) params.set('sort', sort);

      const res = await fetch(`/api/products?${params.toString()}`);
        
      if (!res.ok) throw new Error('Failed to fetch products');

      const data: IProduct[] = await res.json();

      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchProducts(categoryFilter, sortOrder);
  }, [categoryFilter, sortOrder, products])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="flex gap-4 mb-6">

        {/* Category filter dropdown */}
        <Dropdown
            label="Category Filter"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
                { value: '', label: 'All' },
                ...categories.map(category => ({ value: category, label: category }))
            ]}
        />

        {/* Sort price dropdown */}
        <Dropdown
            label="Sort Order"
            value={sortOrder}
            onChange={setSortOrder}
            options={[
                { value: '', label: 'Sort By Price' },
                { value: 'asc', label: 'Price: Low to High' },
                { value: 'desc', label: 'Price: High to Low' }
            ]}
        />

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
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
