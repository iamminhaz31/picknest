"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { products, type Product } from "@/app/data/products";

type State = {
  ids: string[];
  ready: boolean;
};

type Action =
  | { type: "restore"; ids: string[] }
  | { type: "toggle"; id: string }
  | { type: "remove"; id: string };

type WishlistContextValue = {
  items: Product[];
  ready: boolean;
  isSaved: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
};

const WishlistContext =
  createContext<WishlistContextValue | null>(null);

const storageKey = "picknest-wishlist";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "restore":
      return { ids: action.ids, ready: true };

    case "toggle":
      if (
        !state.ready ||
        !products.some((product) => product.id === action.id)
      ) {
        return state;
      }

      return {
        ...state,
        ids: state.ids.includes(action.id)
          ? state.ids.filter((id) => id !== action.id)
          : [...state.ids, action.id],
      };

    case "remove":
      return {
        ...state,
        ids: state.ids.filter((id) => id !== action.id),
      };
  }
}

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
    ids: [],
    ready: false,
  });

  useEffect(() => {
    let restored: string[] = [];

    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(storageKey) ?? "[]",
      );

      if (Array.isArray(saved)) {
        restored = [
          ...new Set(
            saved.filter(
              (id): id is string =>
                typeof id === "string" &&
                products.some((product) => product.id === id),
            ),
          ),
        ];
      }
    } catch {
      // Invalid or unavailable storage starts with an empty wishlist.
    }

    dispatch({ type: "restore", ids: restored });
  }, []);

  useEffect(() => {
    if (!state.ready) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(state.ids));
    } catch {
      // Wishlist still works if browser storage is unavailable.
    }
  }, [state.ids, state.ready]);

  const items = state.ids.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    return product ? [product] : [];
  });

  return (
    <WishlistContext.Provider
      value={{
        items,
        ready: state.ready,
        isSaved: (id) => state.ids.includes(id),
        toggleWishlist: (id) => dispatch({ type: "toggle", id }),
        removeFromWishlist: (id) => dispatch({ type: "remove", id }),
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider.",
    );
  }

  return context;
}