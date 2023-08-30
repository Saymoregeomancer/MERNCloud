export const processString = (inputString, length = 20) => {
  if (inputString.length > length) {
    const firstPart = inputString.substring(0, 6);
    const secondPart = inputString.substring(inputString.length - 5);
    return `${firstPart}...${secondPart}`;
  }
  return inputString;
};
