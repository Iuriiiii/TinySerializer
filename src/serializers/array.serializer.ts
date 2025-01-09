import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { unknownSerializer } from "./unknown.serializer.ts";

/**
 * Serializes an array into a Uint8Array.
 *
 * @param value - The array to serialize
 * @param options - The serialize options
 * @returns The serialized array
 *
 * The function first writes the Opcode.Array opcode, then serializes each item
 * in the array, and finally writes the Opcode.EndArray opcode. The buffers are
 * merged into a single Uint8Array before being returned.
 */
export function arraySerializer(
  value: unknown[],
  options: SerializeOptions,
): Uint8Array {
  const buffers: Uint8Array[] = [
    new Uint8Array([Opcode.Array]),
  ];

  for (const item of value) {
    buffers.push(unknownSerializer(item, options));
  }

  buffers.push(new Uint8Array([Opcode.EndArray]));
  return mergeBuffers(...buffers);
}
