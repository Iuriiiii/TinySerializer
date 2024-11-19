import type { DeserializeOptions } from "../interfaces/mod.ts";

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
