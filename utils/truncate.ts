export const truncate = (text: string) => {
  return text.length > 95 ? text.substring(0, 95) + "..." : text;
};
