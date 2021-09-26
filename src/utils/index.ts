export const textTruncate = (text: string, truncateNumber: number) =>
  text.length > truncateNumber ? `${text.slice(0, truncateNumber)}...` : text;
