import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Home from '@/pages/index';
import IProduct from '@/interfaces/IProduct';

const mockProducts: IProduct[] = [
  {
    id: "1", 
    name: "Test Product 1", 
    category: "Category A", 
    price: 11.11, 
    description: "Test description 1", 
    imageUrl: "https://via.placeholder.com/400x300?text=Wireless+Headphones"
  }, 
  {
    id: "2", 
    name: "Test Product 2", 
    category: "Category B", 
    price: 22.22, 
    description: "Test description 2", 
    imageUrl: "https://via.placeholder.com/400x300?text=Wireless+Headphones"
  },
];

jest.mock("next/image", () => ({
  __esModule: true, default: ({ src, alt, width, height }: {src: string, alt: string, width: number, height: number}) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

describe('Home', () => {
  beforeEach(() => {
    render(<Home products={mockProducts} />);
  });

  it('renders the correct number of product cards', () => {
    const productNameElements = mockProducts.map(product => screen.getByText(product.name));
    expect(productNameElements.length).toBe(mockProducts.length);
  });

  it('renders product images with correct alt attributes', () => {
    mockProducts.forEach(product => {
      const img = screen.getByAltText(product.name);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', product.imageUrl);
    });
  });

  it('renders product names and descriptions', () => {
    mockProducts.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });
  });

  it('renders formatted product prices', () => {
    mockProducts.forEach(product => {
      const priceRegex = new RegExp(`\\$${product.price.toFixed(2)}`);
      expect(screen.getByText(priceRegex)).toBeInTheDocument();
    });
  });
});