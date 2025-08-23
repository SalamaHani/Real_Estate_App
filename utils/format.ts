export const setstring = (Username: string) => {
  return Username.toUpperCase().slice(0, 1);
};
export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};