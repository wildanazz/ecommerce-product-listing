import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  const productName = 'Test Product';
  const label = 'Add to Cart';
  const onClick = jest.fn();

  beforeEach(() => {
    onClick.mockClear();
    render(<Button onClick={onClick} productName={productName} label={label} />);
  });

  it('renders with correct label text', () => {
    expect(screen.getByRole('button')).toHaveTextContent(label);
  });

  it('sets correct aria-label', () => {
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', `${label} ${productName}`);
  });

  it('calls onClick handler when clicked', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});