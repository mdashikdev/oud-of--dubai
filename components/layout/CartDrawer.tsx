'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/Sheet';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    variantTitle?: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      url: string;
      altText?: string;
    };
    product: {
      handle: string;
      title: string;
    };
  };
}

interface Cart {
  id: string;
  lines: CartLine[];
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  checkoutUrl: string;
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  removeCartLine: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: null,
      isLoading: false,
      addToCart: async () => {},
      updateCartLine: async () => {},
      removeCartLine: async () => {},
    };
  }
  return context;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const mockCart: Cart = {
  id: 'mock-cart',
  lines: [],
  cost: {
    subtotalAmount: {
      amount: '0',
      currencyCode: 'BDT',
    },
  },
  checkoutUrl: '/checkout',
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [cart, setCart] = useState<Cart | null>(mockCart);
  const [isUpdating, setIsUpdating] = useState(false);

  const cartLines = cart?.lines || [];
  const itemCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart?.cost?.subtotalAmount
    ? formatPrice(parseFloat(cart.cost.subtotalAmount.amount), cart.cost.subtotalAmount.currencyCode)
    : formatPrice(0);

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    setTimeout(() => {
      setCart((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          lines: prev.lines.map((line) =>
            line.id === lineId ? { ...line, quantity: newQuantity } : line
          ),
        };
      });
      setIsUpdating(false);
    }, 300);
  };

  const handleRemoveItem = async (lineId: string) => {
    setIsUpdating(true);
    setTimeout(() => {
      setCart((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          lines: prev.lines.filter((line) => line.id !== lineId),
        };
      });
      setIsUpdating(false);
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col bg-black border-l border-white/10 w-full max-w-md">
        <SheetHeader className="border-b border-white/10 pb-4">
          <SheetTitle className="text-xl font-semibold tracking-widest text-white">
            Your Bag
          </SheetTitle>
          {itemCount > 0 && (
            <p className="text-sm text-white/50">{itemCount} item{itemCount !== 1 && 's'}</p>
          )}
        </SheetHeader>

        {cartLines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16">
            <p className="text-white/50 mb-6">Your bag is empty</p>
            <Link
              href="/shop"
              onClick={onClose}
              className="px-8 py-3 bg-[#D4AF37] text-black text-sm uppercase tracking-widest font-medium hover:bg-[#D4AF37]/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartLines.map((line) => (
                <div
                  key={line.id}
                  className="flex gap-4 p-4 bg-white/5 border border-white/10"
                >
                  <div className="relative w-20 h-24 bg-white/10 flex-shrink-0">
                    {line.merchandise.image?.url ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={line.merchandise.image.altText || line.merchandise.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${line.merchandise.product.handle}`}
                      onClick={onClose}
                      className="text-white hover:text-[#D4AF37] transition-colors line-clamp-1"
                    >
                      {line.merchandise.product.title}
                    </Link>
                    {line.merchandise.variantTitle && line.merchandise.variantTitle !== 'Default Title' && (
                      <p className="text-xs text-white/50 mt-1">{line.merchandise.variantTitle}</p>
                    )}
                    <p className="text-sm text-[#D4AF37] mt-2">
                      {formatPrice(parseFloat(line.merchandise.price.amount), line.merchandise.price.currencyCode)}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)}
                          disabled={isUpdating || line.quantity <= 1}
                          className="p-1 text-white/60 hover:text-white disabled:opacity-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm text-white">{line.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}
                          disabled={isUpdating}
                          className="p-1 text-white/60 hover:text-white disabled:opacity-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(line.id)}
                        disabled={isUpdating}
                        className="p-1 text-white/40 hover:text-red-400 disabled:opacity-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-white/60">Subtotal</span>
                <span className="text-lg font-semibold text-white">{subtotal}</span>
              </div>
              <p className="text-xs text-white/40">Shipping and taxes calculated at checkout</p>

              <SheetFooter className="flex-col gap-3">
                <Link
                  href={cart?.checkoutUrl || '/checkout'}
                  onClick={onClose}
                  className="w-full py-4 bg-[#D4AF37] text-black text-center text-sm uppercase tracking-widest font-medium hover:bg-[#D4AF37]/90 transition-colors"
                >
                  Checkout
                </Link>
                <button
                  onClick={onClose}
                  className="w-full py-3 text-center text-sm text-white/60 hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}