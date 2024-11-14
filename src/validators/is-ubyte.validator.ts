import { isNumberBetween } from "./is-number-between.validator.ts";

export function isUbyte(value: number) {
  return isNumberBetween(value, 0, 255);
}
