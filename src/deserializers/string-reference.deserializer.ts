import type { DeserializeOptions } from "../interfaces/mod.ts";
import { debug } from "../utils/mod.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

export function stringReferenceDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
) {
  options.offset++;
  // This works because the function detects the number type

  const stringId = unknownDeserializer(serialized, options) as number;
  const _string = options.stringDatabase.get(stringId)!;

  if (!_string) {
    throw new Error(`String #${stringId} not found`);
  }

  return _string;
}
