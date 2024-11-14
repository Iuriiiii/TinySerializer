import { isNumberBetween } from "./is-number-between.validator.ts";

export function isByte(value: number) {
  return isNumberBetween(value, -128, 127);
}
