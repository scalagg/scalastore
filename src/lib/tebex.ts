export type Package = {
  id: number;
  name: string;
  description: string;
  base_price: number;
  total_price: number;
  discount: number;
  image: string;
  // Add any other fields you need
};

export type Category = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  tebex_category_id?: string;
  // Add any other fields you need
};

export const tebexClient = async (query: string) => {
  const token = process.env.NEXT_PUBLIC_TEBEX_TOKEN;
  return await fetch(`https://headless.tebex.io/api/accounts/${token}/${query}`, {
    method: 'GET',
    headers: {},
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getPackages = async (): Promise<Package[]> => {
  const data = await tebexClient('packages');
  return data?.data?.packages || [];
};

export const getCategories = async (): Promise<Category[]> => {
  const data = await tebexClient('categories');
  return data?.data?.categories || [];
};

export const createBasket = async (packageId: number) => {
  // This is a placeholder; adjust as needed for your Tebex API
  const token = process.env.NEXT_PUBLIC_TEBEX_TOKEN;
  return await fetch(`https://headless.tebex.io/api/accounts/${token}/baskets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ package_id: packageId }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}; 