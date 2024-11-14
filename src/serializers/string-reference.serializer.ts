import { NumberSerializationType, Serialization } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { getStringType, mergeBuffers } from "../utils/mod.ts";
import { numberSerializer } from "./number.serializer.ts";

/**
 * With database:
 * Output: 3 bytes.
 * Byte 0: Serialization.String + StringType
 * Byte 1-2: String ID (Word)
 *
 * Without database:
 * Byte 0: Serialization.String + StringType
 * Byte 1-2: String Length (n)
 * Byte 3-n: String
 */
export function stringReferenceSerializer(
  value: string,
  options: SerializeOptions,
) {
  const stringType = getStringType(value);
  const valueId = options.stringDatabase.getOrInsert(value);
  const prefix = new Uint8Array([Serialization.StringReference + stringType]);
  const serializedStringId = numberSerializer(
    valueId,
    NumberSerializationType.Unsigned,
  );

  return mergeBuffers(prefix, serializedStringId);
}
