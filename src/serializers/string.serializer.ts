import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import {
  getStringType,
  numberToBytes,
  stringTypeToByteSize,
} from "../utils/mod.ts";

export function stringSerializer(
  value: string,
  options: SerializeOptions,
): Uint8Array {
  const stringType = getStringType(value);
  const textBytes = new TextEncoder().encode(value);
  const bytes = [
    Opcode.String + stringType,
    ...numberToBytes(
      textBytes.length,
      stringTypeToByteSize(stringType),
    ),
    ...textBytes,
  ];

  if (!options.plainText) {
    options.stringDatabase.getOrInsert(value);
  }

  return new Uint8Array(bytes);
}
