import { shopifyFetch } from '../client';
import type { Cart, CartLine } from '../types';

const CART_FIELDS = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions { name value }
            product { id handle title featuredImage { url altText width height } }
            image { url altText width height }
            price { amount currencyCode }
          }
        }
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  ${CART_FIELDS}
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFields }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  ${CART_FIELDS}
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
    }
  }
`;

const UPDATE_CART_MUTATION = `
  ${CART_FIELDS}
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  ${CART_FIELDS}
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
    }
  }
`;

const APPLY_DISCOUNT_MUTATION = `
  ${CART_FIELDS}
  mutation ApplyDiscount($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart { ...CartFields }
    }
  }
`;

const GET_CART_QUERY = `
  ${CART_FIELDS}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
`;

export async function createCart(lines?: { merchandiseId: string; quantity: number }[]) {
  const { data } = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
    query: CREATE_CART_MUTATION,
    variables: { lines: lines?.map((l) => ({ merchandiseId: l.merchandiseId, quantity: l.quantity })) },
    cache: 'no-store',
    tags: ['cart'],
  });
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) {
  const { data } = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
    tags: ['cart'],
  });
  return data.cartLinesAdd.cart;
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[]
) {
  const { data } = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
    tags: ['cart'],
  });
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const { data } = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
    tags: ['cart'],
  });
  return data.cartLinesRemove.cart;
}

export async function applyDiscountCode(cartId: string, discountCode: string) {
  const { data } = await shopifyFetch<{ cartDiscountCodesUpdate: { cart: Cart } }>({
    query: APPLY_DISCOUNT_MUTATION,
    variables: { cartId, discountCodes: [discountCode] },
    cache: 'no-store',
    tags: ['cart'],
  });
  return data.cartDiscountCodesUpdate.cart;
}

export async function getCart(cartId: string) {
  const { data } = await shopifyFetch<{ cart: Cart }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
    tags: ['cart'],
  });
  return data.cart;
}