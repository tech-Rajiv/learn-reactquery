export const getRsFromUsd = (usd: number) => {
  const rs = usd * 89;
  return rs.toLocaleString("en-IN", {
    maximumFractionDigits: 5,
    minimumFractionDigits: 2,
  });
};
