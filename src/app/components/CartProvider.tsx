"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { products, type Product } from "@/app/data/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type State = {
  items: CartItem[];
  ready: boolean;
};

type Action =
  | { type: "restore"; items: CartItem[] }
  | { type: "add"; product: Product }
  | { type: "quantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "picknest-cart";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "restore":
      return { items: action.items, ready: true };

    case "add": {
      if (!state.ready || action.product.stock < 1) return state;

      const existing = state.items.find(
        (item) => item.product.id === action.product.id,
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + 1,
                    action.product.stock,
                  ),
                }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }

    case "quantity":
      if (!Number.isInteger(action.quantity)) return state;

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  Math.min(action.quantity, item.product.stock),
                ),
              }
            : item,
        ),
      };

    case "remove":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.id,
        ),
      };

    case "clear":
      return { ...state, items: [] };
  }
}

export default function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    ready: false,
  });

  useEffect(() => {
    const restored: CartItem[] = [];

    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(storageKey) ?? "[]",
      );

      if (Array.isArray(saved)) {
        for (const entry of saved) {
          if (
            !entry ||
            typeof entry.id !== "string" ||
            !Number.isInteger(entry.quantity) ||
            entry.quantity < 1
          ) {
            continue;
          }

          const product = products.find(
            (item) => item.id === entry.id,
          );

          if (
            !product ||
            product.stock < 1 ||
            restored.some((item) => item.product.id === product.id)
          ) {
            continue;
          }

          restored.push({
            product,
            quantity: Math.min(entry.quantity, product.stock),
          });
        }
      }
    } catch {
      // Invalid or unavailable storage starts with an empty cart.
    }

    dispatch({ type: "restore", items: restored });
  }, []);

  useEffect(() => {
    if (!state.ready) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(
          state.items.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
        ),
      );
    } catch {
      // The cart still works if browser storage is unavailable.
    }
  }, [state.items, state.ready]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        ready: state.ready,
        totalItems: state.items.reduce(
          (total, item) => total + item.quantity,
          0,
        ),
        subtotal:
          state.items.reduce(
            (total, item) =>
              total + Math.round(item.product.price * 100) * item.quantity,
            0,
          ) / 100,
        addToCart: (product) => dispatch({ type: "add", product }),
        updateQuantity: (id, quantity) =>
          dispatch({ type: "quantity", id, quantity }),
        removeFromCart: (id) => dispatch({ type: "remove", id }),
        clearCart: () => dispatch({ type: "clear" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}