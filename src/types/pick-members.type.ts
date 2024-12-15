export type PickMembers<T> = {
  // deno-lint-ignore ban-types
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
