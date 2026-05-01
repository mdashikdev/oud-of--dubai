export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: Money;
  compareAtPrice: Money | null;
  image?: Image;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  vendor: string;
  tags: string[];
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  compareAtPriceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  featuredImage: Image;
  images: { nodes: Image[] };
  variants: { nodes: ProductVariant[] };
  options: { name: string; values: string[] }[];
  metafields?: { key: string; value: string }[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Image | null;
  products: { nodes: Product[]; pageInfo: PageInfo };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    product: Product;
    image?: Image;
    price: Money;
  };
  cost: { totalAmount: Money };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: { nodes: CartLine[] };
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  orders: { nodes: Order[]; pageInfo: PageInfo };
  addresses: { nodes: Address[] };
}

export interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  statusUrl: string;
  totalPrice: Money;
  lineItems: { nodes: LineItem[] };
}

export interface LineItem {
  title: string;
  quantity: number;
  variant: ProductVariant | null;
  image?: Image;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string | null;
}

export interface Page {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodyHtml: string;
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface Metafield {
  key: string;
  value: string;
  type: string;
  namespace: string;
}