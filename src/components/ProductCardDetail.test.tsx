import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ProductCardDetail from './ProductCardDetail';
import IProduct from '@/interfaces/IProduct';

const mockProduct: IProduct = {
  id: '456',
  name: 'Detailed Product',
  description: 'This is a detailed description.',
  category: 'Category B',
  price: 149.99,
  sku: 'SKU-456',
  available: true,
  imageUrl: 'https://via.placeholder.com/400x300?text=Detailed+Product',
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => ( <img src={src} alt={alt} /> )
}));

describe('ProductCardDetail', () => {
  beforeEach(() => {
    render(<ProductCardDetail product={mockProduct} />);
  });

  it('renders the product name and description', () => {
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('renders the product image with correct attributes', () => {
    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.imageUrl);
  });

  it('displays the correct price', () => {
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it('displays the SKU', () => {
    expect(screen.getByText('SKU:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.sku!)).toBeInTheDocument();
  });

  it('shows "In Stock" if available', () => {
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('shows "Out of Stock" if not available', () => {
    render(<ProductCardDetail product={{ ...mockProduct, available: false }} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
});