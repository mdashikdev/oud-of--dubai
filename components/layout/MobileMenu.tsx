'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/offers', label: 'Offers' },
  { href: '/combo', label: 'Combo' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full max-w-sm bg-black border-r border-white/10">
        <SheetHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-4">
          <SheetTitle className="text-xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            OUD OF DUBAI
          </SheetTitle>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </SheetHeader>

        <nav className="flex flex-col gap-2 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg uppercase tracking-widest text-white/80 hover:text-[#D4AF37] py-4 px-4 transition-colors duration-200 border-b border-white/5 hover:border-[#D4AF37]/30"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <Link
            href="/account/login"
            onClick={onClose}
            className="block text-center text-sm uppercase tracking-widest text-white/60 hover:text-[#D4AF37] py-3 transition-colors"
          >
            My Account
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}