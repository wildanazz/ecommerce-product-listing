import Image from 'next/image';

import IProduct from '@/interfaces/IProduct';

export default function ProductCardDetail({ product }: { product: IProduct }) {
  return (
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
  );
}