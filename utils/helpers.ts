/**
 * Capitalizes the first letter of a word
 * @param word
 */
export const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

/**
 * Truncates a string of text
 * @param text
 */
export const truncate = (text: string) => {
  return text.length > 95 ? text.substring(0, 95) + "..." : text;
};