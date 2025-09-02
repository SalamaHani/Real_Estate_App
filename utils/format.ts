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
export function isRealString(value: string) {
  return typeof value === "string" && !/^\d+$/.test(value);
}

export function formatPrice(value: string): string {
  const num = Number(value);

  if (isNaN(num)) return value;

  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toLocaleString("en-US", {
      maximumFractionDigits: num % 1_000_000 === 0 ? 0 : 2,
    })}M`;
  }

  if (num >= 1_000) {
    return `$${(num / 1_000).toLocaleString("en-US", {
      maximumFractionDigits: num % 1_000 === 0 ? 0 : 2,
    })}K`;
  }
  return `$${num}`;
}
