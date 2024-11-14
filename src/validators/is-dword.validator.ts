import { isNumberBetween } from "./is-number-between.validator.ts";

export function isDword(value: number) {
  return isNumberBetween(value, -2147483648, 2147483647);
}
