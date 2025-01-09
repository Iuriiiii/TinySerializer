import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";

/**
 * Deserializes a boolean value from the given serialized array.
 *
 * @param serialized - The serialized array
 * @param options - The deserialize options
 * @returns The deserialized boolean
 */
export function booleanDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): boolean {
  const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  return currentOpcode === Opcode.True;
}
