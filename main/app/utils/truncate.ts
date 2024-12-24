export const truncate = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - 3) + "...";
};
