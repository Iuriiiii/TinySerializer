import { isNumberBetween } from "./is-number-between.validator.ts";

export function isWord(value: number) {
  return isNumberBetween(value, -32768, 32767);
}
