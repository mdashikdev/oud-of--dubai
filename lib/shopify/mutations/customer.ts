import { shopifyFetch } from '../client';
import type { Customer, Page } from '../types';

const CREATE_CART_MUTATION = `
  mutation CreateCustomerSession($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

const VALIDATE_TOKEN_QUERY = `
  query ValidateToken($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id firstName lastName email phone
    }
  }
`;

export async function createCustomerToken(email: string, password: string) {
  const { data } = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      customerUserErrors: { code: string; field: string; message: string }[];
    };
  }>({
    query: CREATE_CART_MUTATION,
    variables: { input: { email, password } },
    cache: 'no-store',
    tags: ['customers'],
  });

  if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
    throw new Error(
      data.customerAccessTokenCreate.customerUserErrors[0].message
    );
  }

  if (!data.customerAccessTokenCreate.customerAccessToken) {
    throw new Error('Invalid email or password');
  }

  return data.customerAccessTokenCreate.customerAccessToken;
}

export async function validateToken(accessToken: string) {
  const { data } = await shopifyFetch<{ customer: Omit<Customer, 'orders' | 'addresses'> | null }>({
    query: VALIDATE_TOKEN_QUERY,
    variables: { customerAccessToken: accessToken },
    cache: 'no-store',
    tags: ['customers'],
  });
  return data.customer;
}