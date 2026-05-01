'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import CartDrawer from './CartDrawer';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/offers', label: 'Offers' },
  { href: '/combo', label: 'Combo' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-[0.3em] text-[#D4AF37] uppercase"
          >
            OUD OF DUBAI
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest text-white/80 hover:text-[#D4AF37] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="p-2 text-white/80 hover:text-[#D4AF37] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/account/login"
              aria-label="Account"
              className="p-2 text-white/80 hover:text-[#D4AF37] transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="p-2 text-white/80 hover:text-[#D4AF37] transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white/80 hover:text-[#D4AF37] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}