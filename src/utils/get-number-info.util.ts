import type { NumberInfo } from "../interfaces/mod.ts";

export function getNumberInfo(value: number): NumberInfo {
  const isFloat = value % 1 !== 0;
  const isSigned = value < 0;
  const temp = Math.abs(value);

  const byteSize = (() => {
    if (isFloat) {
      return 7;
    }

    let count = 1;

    while (2 ** count <= temp) {
      count++;
    }

    return Math.ceil(count / 8);
  })();

  return {
    byteSize,
    isSigned,
    isFloat,
    value: temp,
  };
}
