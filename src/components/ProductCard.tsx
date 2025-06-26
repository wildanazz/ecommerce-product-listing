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
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="text-sm">
          <strong>Price:</strong> ${product.price}
        </p>
      </a>
    </Link>
  );
}