import { isNumberBetween } from "./is-number-between.validator.ts";

export function isWord(value: number): boolean {
    return isNumberBetween(value, -32768, 65535);
}
