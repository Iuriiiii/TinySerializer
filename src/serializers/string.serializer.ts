import { Serialization } from "../enums/mod.ts";
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
    Serialization.String + stringType,
    ...numberToBytes(
      textBytes.length,
      stringTypeToByteSize(stringType),
    ),
    ...textBytes,
  ];

  options.stringDatabase.getOrInsert(value);
  return new Uint8Array(bytes);
}
