import type { DeserializeOptions } from "../interfaces/mod.ts";

/**
 * Deserializes an undefined value.
 *
 * @param options - The deserialize options
 * @returns Always undefined
 */
export function undefinedDeserializer(options: DeserializeOptions): undefined {
  options.offset++;
  return;
}
