export function shortAddress(address?: string, from = 4, to = 4) {
  if (!address) return 'not found';
  return address
    .substring(0, from)
    .concat('...')
    .concat(address.substring(address.length - to));
}
