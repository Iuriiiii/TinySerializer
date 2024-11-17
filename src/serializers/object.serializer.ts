import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { memberSerializer } from "./member.serializer.ts";

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
