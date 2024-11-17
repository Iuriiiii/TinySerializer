import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { unknownSerializer } from "./unknown.serializer.ts";

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
