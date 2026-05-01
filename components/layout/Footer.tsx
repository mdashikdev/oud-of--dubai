import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const quickLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/offers', label: 'Offers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const customerCare = [
  { href: '/track-order', label: 'Track Order' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/returns', label: 'Returns' },
  { href: '/faq', label: 'FAQ' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link
              href="/"
              className="text-xl font-bold tracking-[0.3em] text-[#D4AF37] uppercase inline-block"
            >
              OUD OF DUBAI
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Experience the finest oriental fragrances from the heart of Dubai.
              Premium quality perfumes crafted with passion.
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-widest text-white/40">
                Newsletter
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] text-black text-sm uppercase tracking-widest font-medium hover:bg-[#D4AF37]/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-widest text-white font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-widest text-white font-semibold">
              Customer Care
            </h3>
            <ul className="space-y-3">
              {customerCare.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-widest text-white font-semibold">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <p className="leading-relaxed">
                  Oud Of Dubai Store
                  <br />
                  Dubai, United Arab Emirates
                </p>
              </li>
              <li>
                <a href="tel:+97141234567" className="hover:text-[#D4AF37] transition-colors">
                  +971 4 123 4567
                </a>
              </li>
              <li>
                <a href="mailto:hello@oudofdubai.com" className="hover:text-[#D4AF37] transition-colors">
                  hello@oudofdubai.com
                </a>
              </li>
            </ul>
            <div className="flex gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/40 hover:text-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/40 hover:text-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/40 hover:text-[#D4AF37] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Oud Of Dubai. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>Payment Methods:</span>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-white/5 border border-white/10 text-xs">Visa</div>
                <div className="px-2 py-1 bg-white/5 border border-white/10 text-xs">MasterCard</div>
                <div className="px-2 py-1 bg-white/5 border border-white/10 text-xs">Amex</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}