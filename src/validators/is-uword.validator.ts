import { isNumberBetween } from "./is-number-between.validator.ts";

export function isUword(value: number) {
  return isNumberBetween(value, 0, 65535);
}
