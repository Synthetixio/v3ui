export const prettyString = (text: string, startLength = 6, endLength = 4) => {
  if (text.length <= startLength + endLength) {
    return text;
  }
  return `${text.substring(0, startLength)}...${text.substring(text.length - endLength)}`;
};
