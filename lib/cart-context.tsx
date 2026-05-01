'use client';

import * as React from 'react';
import { createContext, useContext } from 'react';
import type { Cart } from '@/lib/shopify/types';
import * as cartMutations from '@/lib/shopify/mutations/cart';
import { getCart } from '@/lib/shopify/mutations/cart';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

interface CartContextValue {
  cart: Cart | null;
  isLoading: boolean;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  applyDiscount: (code: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<Cart | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const cartId = getCookie('cartId') as string | undefined;

  React.useEffect(() => {
    if (cartId) {
      getCart(cartId)
        .then((c) => { if (c) setCart(c); else { deleteCookie('cartId'); setCart(null); } })
        .catch(() => { deleteCookie('cartId'); setCart(null); });
    }
  }, [cartId]);

  async function addItem(merchandiseId: string, quantity = 1) {
    setIsLoading(true);
    try {
      let updatedCart: Cart;
      if (cart) {
        updatedCart = await cartMutations.addToCart(cart.id, [{ merchandiseId, quantity }]);
      } else {
        updatedCart = await cartMutations.createCart([{ merchandiseId, quantity }]);
        setCookie('cartId', updatedCart.id, { maxAge: 60 * 60 * 24 * 30 });
      }
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateItem(lineId: string, quantity: number) {
    if (!cart) return;
    setIsLoading(true);
    try {
      const updatedCart = await cartMutations.updateCart(cart.id, [{ id: lineId, quantity }]);
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeItem(lineId: string) {
    if (!cart) return;
    setIsLoading(true);
    try {
      const updatedCart = await cartMutations.removeFromCart(cart.id, [lineId]);
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }

  async function applyDiscount(code: string) {
    if (!cart) return;
    setIsLoading(true);
    try {
      const updatedCart = await cartMutations.applyDiscountCode(cart.id, code);
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshCart() {
    if (!cartId) return;
    const c = await getCart(cartId);
    setCart(c);
  }

  return (
    <CartContext.Provider value={{ cart, isLoading, addItem, updateItem, removeItem, applyDiscount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}