import { isNumberBetween } from "./is-number-between.validator.ts";

export function isJsNumber(value: number) {
  return isNumberBetween(value, 0, 2 ** 53);
}
