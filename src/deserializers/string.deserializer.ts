import { Opcode } from "../enums/mod.ts";
import type { StringType } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";
import { stringTypeToByteSize } from "../utils/mod.ts";
import { unumberDeserializer } from "./unumber.deserializer.ts";

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
  const currentOpcode = serialized.at(options.offset)!;
  const stringType = (currentOpcode - Opcode.String) as StringType;
  // Move pointer to string length
  const stringLength = unumberDeserializer(
    serialized,
    options,
    stringTypeToByteSize(stringType),
  );

  const _string = serialized.slice(
    options.offset,
    options.offset + stringLength,
  );
  const deserializedString = new TextDecoder().decode(_string);

  options.offset += stringLength;

  return deserializedString;
}
