import type { DeserializeOptions } from "../interfaces/mod.ts";

/**
 * Deserializes a reference from the serialized data.
 *
 * @param serialized - The serialized Uint8Array containing the reference.
 * @param options - The options for deserialization, including the object database
 *                  and current offset.
 * @returns The deserialized object reference.
 */
export function referenceDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): object {
  options.offset++;
  const objectId = serialized.at(options.offset)!;
  const reference = options.objectDatabase.getById(objectId)!;
  options.offset++;

  return reference;
}
