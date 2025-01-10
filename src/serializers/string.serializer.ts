import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { numberSerializer } from "./number.serializer.ts";

/**
 * Serializes a string to a Uint8Array buffer.
 *
 * @param value - The string to serialize
 * @param options - The serialize options
 * @returns The serialized string as a Uint8Array, including the Opcode.String
 *          opcode, the string length, and the string itself.
 *
 * If options.plainText is false, the string is registered in the string database.
 */
export function stringSerializer(
  value: string,
  options: SerializeOptions,
): Uint8Array {
  const textBytes = new TextEncoder().encode(value);
  const prefix = new Uint8Array([Opcode.String]);
  const stringLength = numberSerializer(
    textBytes.length,
    options,
  );

  if (!options.plainText) {
    options.stringDatabase.getOrInsert(value);
  }

  return mergeBuffers(prefix, stringLength, textBytes);
}
