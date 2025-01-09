import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { getStringType, mergeBuffers } from "../utils/mod.ts";
import { numberSerializer } from "./number.serializer.ts";

/**
 * Serializes a string reference. If the string is not in the database, it will
 * be added.
 *
 * @param value - The string to serialize.
 * @param options - The serialize options.
 * @returns A Uint8Array containing the serialized string reference.
 */
export function stringReferenceSerializer(
  value: string,
  options: SerializeOptions,
): Uint8Array {
  const stringType = getStringType(value);
  const valueId = options.stringDatabase.getOrInsert(value);
  const prefix = new Uint8Array([Opcode.StringReference + stringType]);
  const serializedStringId = numberSerializer(
    valueId,
    options,
  );

  return mergeBuffers(prefix, serializedStringId);
}
