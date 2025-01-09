import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";

/**
 * Deserializes Infinity or -Infinity
 *
 * @param serialized - The whole serialized array
 * @param options - The deserialize options
 * @returns - Returns `Infinity` or `-Infinity`
 */
export function infinityDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  return currentOpcode === Opcode.Infinity ? Infinity : -Infinity;
}
