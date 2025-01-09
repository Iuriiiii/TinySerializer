import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { memberSerializer } from "./member.serializer.ts";

/**
 * Serializes an object into a Uint8Array.
 *
 * @param value - The object to serialize.
 * @param options - Options for serialization, including databases and encoder settings.
 * @returns The serialized object as a Uint8Array, wrapped with Opcode.Object and Opcode.EndObject.
 *
 * The function serializes each key-value pair of the object using `memberSerializer` and
 * merges the resulting buffers with a prefix and suffix indicating the start and end of the object.
 */
export function objectSerializer(
  value: object,
  options: SerializeOptions,
): Uint8Array {
  const buffers: Uint8Array[] = [new Uint8Array([Opcode.Object])];

  for (const entry of Object.entries(value)) {
    buffers.push(memberSerializer(entry, options));
  }

  buffers.push(new Uint8Array([Opcode.EndObject]));
  return mergeBuffers(...buffers);
}
