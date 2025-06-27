import Link from 'next/link';
import Image from 'next/image';

import IProduct from "@/interfaces/IProduct";

/**
 * ProductCard Component
 *
 * Displays a single product as a clickable card with image, name, description, and price.
 * Navigates to the product detail page when clicked.
 *
 * @param {Object} props
 * @param {IProduct} props.product - The product data to display
 */
export function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link legacyBehavior href={`/products/${product.id}`}>
      <a className="block border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-black">{product.name}</h3>
        <p className="text-sm mb-2 text-black">{product.description}</p>
        <p className="text-sm text-green-700">${product.price.toFixed(2)}</p>
      </a>
    </Link>
  );
}