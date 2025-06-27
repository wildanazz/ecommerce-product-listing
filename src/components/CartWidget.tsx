import { useCartStore } from '@/store/cartStore';

/**
 * CartWidget Component
 *
 * Displays a floating cart summary in the top-right corner of the screen.
 * Shows the total quantity of items in the cart and a button to reset the cart.
 * Pulls cart state from the Zustand store and responds to changes.
 *
 * @component
 * @returns {JSX.Element} The cart widget with quantity badge and reset button
 */
export default function CartWidget() {
  const items = useCartStore((state) => state.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const resetCart = useCartStore((state) => state.resetCart);

  return (
    <div className="fixed top-4 right-4 z-50 select-none flex items-center space-x-3">
      <div
        className="relative flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg shadow-md text-white"
        aria-label="Cart status"
        title="Cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h14M7 13l-2 4m9 0a1 1 0 100 2 1 1 0 000-2zm-7 0a1 1 0 100 2 1 1 0 000-2z"
          />
        </svg>
        <span className="font-semibold">Cart</span>

        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none bg-red-600 rounded-full shadow-lg">
            {totalQuantity}
          </span>
        )}
      </div>

      {/* Reset Cart Button */}
      {totalQuantity > 0 && (
        <button
          onClick={resetCart}
          className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold shadow-md transition"
          aria-label="Clear cart"
          title="Clear Cart"
        >
          Reset
        </button>
      )}
    </div>
  );
}
