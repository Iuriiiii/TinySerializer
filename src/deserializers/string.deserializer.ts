import type { DeserializeOptions } from "../interfaces/mod.ts";
import { numberDeserializer } from "./number.deserializer.ts";

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
export function stringDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): string {
  options.offset++;

  const stringLength = numberDeserializer(
    serialized,
    options,
  );

  const _string = serialized.slice(
    options.offset,
    options.offset + stringLength,
  );

  const deserializedString = new TextDecoder().decode(_string);

  options.offset += stringLength;

  return deserializedString;
}
