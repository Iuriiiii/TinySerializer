import { isNumberBetween } from "./is-number-between.validator.ts";

export function isUdword(value: number) {
  return isNumberBetween(value, 0, 4294967295);
}
