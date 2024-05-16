export function stringToHash(s: string | undefined) {
  return (s || '').split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}
