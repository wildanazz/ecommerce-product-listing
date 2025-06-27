import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import CartWidget from './CartWidget';
import { useCartStore } from '@/store/cartStore';

jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn()
}));

describe('CartWidget', () => {
  it('displays total quantity and renders reset button when items exist', () => {
    const mockResetCart = jest.fn();

    (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        items: [
          { id: '1', quantity: 2 },
          { id: '2', quantity: 3 }
        ],
        resetCart: mockResetCart
      })
    );

    render(<CartWidget />);
    expect(screen.getByText('5')).toBeInTheDocument();
    const resetButton = screen.getByRole('button', { name: /clear cart/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(mockResetCart).toHaveBeenCalledTimes(1);
  });

  it('does not render reset button when cart is empty', () => {
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        items: [],
        resetCart: jest.fn()
      })
    );

    render(<CartWidget />);
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });
});