export type MakeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export type Modify<T, R> = Omit<T, keyof R> & R;
