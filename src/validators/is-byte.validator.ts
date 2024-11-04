import { isNumberBetween } from "./is-number-between.validator.ts";

export function isByte(value: number): boolean {
    return isNumberBetween(value, -128, 255);
}
