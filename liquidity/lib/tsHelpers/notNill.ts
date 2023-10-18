// This is a type guard function that checks if a value is not null and not undefined.
// This is useful when filtering an array that might have null or undefined values.
export const notNil = <T>(x: T | null | undefined): x is T => x !== null && x !== undefined;
