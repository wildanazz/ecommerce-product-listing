import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (id: string) => void;
  getQuantity: (id: string) => number;
  resetCart: () => void;
}

/**
 * useCartStore - Zustand-based global cart store
 *
 * Provides:
 * - Persistent cart state across page reloads using localStorage.
 * - Functions to add items, get item quantity, and reset the cart.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Adds a product to the cart by its ID
      // If the product is already in the cart, increases its quantity by 1
      addToCart: (id) => {
        const items = get().items;
        const index = items.findIndex(item => item.id === id);

        if (index === -1) {
          set({ items: [...items, { id, quantity: 1 }] });
        } else {
          const updatedItems = [...items];
          updatedItems[index].quantity += 1;
          set({ items: updatedItems });
        }
      },

      // Retrieves the quantity of a specific item in the cart
      getQuantity: (id) => {
        const item = get().items.find(item => item.id === id);
        return item ? item.quantity : 0;
      },

      // Resets the cart by clearing all items
      resetCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
