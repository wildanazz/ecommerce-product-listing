import IProduct from "@/interfaces/IProduct";
import { useEffect, useState } from 'react';

import { ProductCard } from "@/components/ProductCard";
import { Dropdown } from '@/components/Dropdown';
import { getProductsFromAPI } from "@/lib/load-products";

/**
 * Home Component
 * 
 * Server-side rendered page with client-side interactivity to display a product list.
 * 
 * Features:
 * - Displays products fetched from an API.
 * - Filters products by category.
 * - Sorts products by price (ascending or descending).
 * 
 * UI Elements:
 * - Category filter dropdown: dynamically populated based on product categories.
 * - Sort order dropdown: allows sorting by price.
 * - Responsive grid layout: renders product cards showing images, name, description, and price.
 * - Loading spinner: shown while fetching data from the API.
 * 
 * Data Flow:
 * - Initial product data is loaded on the server via `getServerSideProps`.
 * - Client-side fetch updates the displayed products based on selected filters and sort order.
 * 
 * @param {Object} props - Component props.
 * @param {IProduct[]} props.products - Initial list of products fetched on the server.
 * 
 * @returns {JSX.Element} The rendered product listing page.
 */
export default function Home({ products }: { products: IProduct[] }) {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
  const [loading, setLoading] = useState(false);

  // Get all products categories
  const categories = Array.from(new Set(products.map(product => product.category)))

  const fetchProducts = async (category: string, sort: string) => { 
    setLoading(true);
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
    } finally {
        setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts(categoryFilter, sortOrder);
  }, [categoryFilter, sortOrder, products])

  return (
    <main className="flex flex-col items-center pt-24 px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 overflow-hidden">
      <h1 className="text-3xl font-bold">Product List</h1>
      <div className="my-7 lg:my-16 font-light w-full text-black dark:text-white">
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
        
        {/* Products grid */}
        {loading ? (
            <div className="flex flex-col w-full items-center" role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 animate-spin text-gray-300 fill-black"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  const products = await getProductsFromAPI()
  return { props: { products } };
}
