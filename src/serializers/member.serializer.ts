import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { stringReferenceSerializer } from "./string-reference.serializer.ts";
import { unknownSerializer } from "./unknown.serializer.ts";

/**
 * Serializes a member (key-value pair) into a Uint8Array.
 *
 * @param value - A tuple containing the key as a string and the value as an unknown type.
 * @param options - Options for serialization, including databases and encoder settings.
 * @returns The serialized member as a Uint8Array, prefixed with the Opcode.Member.
 */
export function memberSerializer(
  value: [string, unknown],
  options: SerializeOptions,
): Uint8Array {
  const [key, val] = value;
  const serializedKey = stringReferenceSerializer(key, options);
  const serializedValue = unknownSerializer(val, options);
  const prefix = new Uint8Array([Opcode.Member]);

  return mergeBuffers(prefix, serializedKey, serializedValue);
}
