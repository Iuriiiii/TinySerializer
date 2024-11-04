import { isNumberBetween } from "./is-number-between.validator.ts";

export function isQword(value: number): boolean {
    return isNumberBetween(
        value,
        Number.MIN_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
    );
}
