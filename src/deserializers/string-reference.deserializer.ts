import { isUndefined } from "@online/is";
import type { DeserializeOptions } from "../interfaces/mod.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

/**
 * Deserializes a string reference.
 *
 * @param serialized - The serialized array
 * @param options - The deserialize options
 * @returns - The deserialized string
 */
export function stringReferenceDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): string {
  options.offset++;
  // This works because the function detects the number type

  const stringId = unknownDeserializer(serialized, { ...options, decoder: undefined }) as number;
  const _string = options.stringDatabase.getById(stringId)!;

  if (isUndefined(_string)) {
    throw new Error(`String #${stringId} not found`);
  }

  return _string;
}
