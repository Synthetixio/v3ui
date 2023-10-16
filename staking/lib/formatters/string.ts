export const truncateAddress = (address: string, first = 5, last = 5) => {
  if (address.length <= first + last) {
    return address;
  }
  return `${address.slice(0, first)}...${address.slice(-last)}`;
};

export const parseFloatWithCommas = (numberWithCommas: string) =>
  parseFloat(numberWithCommas.replaceAll(',', ''));
