import Image from 'next/image';

import IProduct from "@/interfaces/IProduct";

/**
 * ProductCard Component
 *
 * Displays a single product as a card with image, name, description, and price.
 *
 * @param {Object} props
 * @param {IProduct} props.product - The product data to display
 */
export function ProductCard({ product }: { product: IProduct }) {
  return (
    <div>
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
    </div>
  )
}