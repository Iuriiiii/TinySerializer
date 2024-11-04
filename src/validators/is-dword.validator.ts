import { isNumberBetween } from "./is-number-between.validator.ts";

export function isDword(value: number): boolean {
    return isNumberBetween(value, -2147483648, 4294967295);
}
