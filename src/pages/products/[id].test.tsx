import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import ProductDetail from './[id]';
import IProduct from '@/interfaces/IProduct';

const mockProduct: IProduct = {
  id: '123',
  name: 'Test Product',
  description: 'A wonderful product',
  category: 'Category A',
  price: 99.99,
  imageUrl: 'https://via.placeholder.com/400x300?text=Wireless+Headphones',
};

jest.mock("next/image", () => ({
  __esModule: true, default: ({ src, alt, width, height }: {src: string, alt: string, width: number, height: number}) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

describe('ProductDetail', () => {
    beforeEach(() => {
        render(<ProductDetail product={mockProduct} />);
    });
    
    it('renders product names and descriptions', () => { 
        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    });
    
    it('renders product images with correct alt attributes', () => { 
        const img = screen.getByAltText(mockProduct.name);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockProduct.imageUrl);
    });
});