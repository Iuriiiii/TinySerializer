import type { DeserializeOptions } from "../interfaces/mod.ts";

export function referenceDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): object {
  options.offset++;
  const objectId = serialized.at(options.offset)!;

  return options.objectDatabase.get(objectId)!;
}
