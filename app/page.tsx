import { getProducts, getCollections } from '@/lib/shopify/queries/products';
import { HeroSection, FeaturedProducts, SignatureEdit, FAQSection, NewsletterSection } from '@/components/sections/HomepageSections';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oud of Dubai — Premium Fragrances',
  description: 'Discover premium perfume oils, extrait de parfum, and signature fragrances crafted for lasting intensity.',
};

const FAQ_ITEMS = [
  {
    question: 'Are these original perfumes?',
    answer: 'We offer inspired (impression) fragrances — not original branded ones. We carefully recreate the scent profile of iconic perfumes in a more accessible form.',
  },
  {
    question: 'How close is the scent to the original?',
    answer: 'Our fragrances achieve up to 90%–95% similarity depending on batch and quality. You\'ll experience the same vibe and essence, refined for you.',
  },
  {
    question: 'How is the lasting, projection & sillage?',
    answer: 'Our perfumes typically last 6–10 hours on skin (even longer on fabric). Projection stays strong for the first 1–2 hours, then settles into a close, elegant scent with a soft trail.',
  },
  {
    question: 'Oil or Spray — which should you choose?',
    answer: 'We offer both: Oil (Attar) for longer lasting wear, and Spray (EDP) for better projection and convenience. For the best experience, we recommend using both together.',
  },
  {
    question: 'Is it safe & how does delivery/payment work?',
    answer: 'Our products are generally skin-safe (patch test recommended for sensitive skin). Delivery: Dhaka 1–2 days | Outside Dhaka 2–4 days. We offer Cash on Delivery along with secure online payment options.',
  },
  {
    question: 'What is your return policy?',
    answer: 'You can check the product in front of the delivery agent upon receiving it. If you wish to return it immediately, you may do so by paying the applicable delivery charge.',
  },
];

export default async function HomePage() {
  const [featuredProducts, allProducts, collections] = await Promise. all([
    getProducts(4, 'BEST_ SELLING', true),
    getProducts(4, 'CREATED_ AT', true),
    getCollections(20),
  ]);

  const signatureCollections = collections.filter((c) =>
    ['masculine', 'feminine', 'for-everyone']. includes(c.handle)
  );

  return (
    <div className="w-full">
      <HeroSection />
      <FeaturedProducts
        title="Extrait de Parfum"
        description="High-concentration perfumes crafted for lasting intensity."
        categoryHandle="perfume"
        products={featuredProducts.nodes}
      />
      <FeaturedProducts
        title="Pure Oil"
        description="Concentrated perfume oils for deeper, long-lasting wear."
        categoryHandle="perfume-oil"
        products={allProducts.nodes}
      />
      <SignatureEdit collections={signatureCollections} />
      <FAQSection items={FAQ_ ITEMS} />
      <NewsletterSection />
    </div>
  );
}