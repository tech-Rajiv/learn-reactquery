export const getRsFromUsd = (usd: number) => {
  return (usd * 89).toFixed(2).toLocaleString();
};
