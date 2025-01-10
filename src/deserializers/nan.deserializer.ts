import type { DeserializeOptions } from "../interfaces/mod.ts";

/**
 * Deserializes NaN
 *
 * @param options - The deserialize options
 * @returns - Returns `NaN`
 */
export function nanDeserializer(options: DeserializeOptions): number {
  options.offset++;
  return NaN;
}
