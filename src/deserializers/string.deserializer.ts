import type { DeserializeOptions } from "../interfaces/mod.ts";
import { numberDeserializer } from "./number.deserializer.ts";

/**
 * Deserializes a string.
 *
 * @param serialized - The whole serialized array
 * @param options - The deserialize options
 * @returns - The deserialized string
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
