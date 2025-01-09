import type { DeserializeOptions } from "../interfaces/mod.ts";

/**
 * Deserializes a null value.
 *
 * @param options - Options for the deserialization process, including the current offset.
 * @returns `null` after incrementing the offset.
 */
export function nullDeserializer(options: DeserializeOptions): null {
  options.offset++;
  return null;
}
