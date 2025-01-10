import type { DeserializeOptions } from "../interfaces/mod.ts";

/**
 * Deserializes a 8-byte unsigned integer from the given serialized array.
 *
 * @param serialized - The whole serialized array
 * @param options - The deserialize options
 * @returns The deserialized 8-byte unsigned integer
 */
export function qwordDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  // const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  const result = serialized.at(options.offset)! +
    (serialized.at(options.offset + 1)! << 8) +
    (serialized.at(options.offset + 2)! << 16) +
    (serialized.at(options.offset + 3)! << 24) +
    (serialized.at(options.offset + 4)! << 32) +
    (serialized.at(options.offset + 5)! << 40) +
    (serialized.at(options.offset + 6)! << 48) +
    (serialized.at(options.offset + 7)! << 56);
  options.offset += 8;

  return result;
}
