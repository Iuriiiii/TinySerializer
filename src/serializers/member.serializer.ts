import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { stringReferenceSerializer } from "./string-reference.serializer.ts";
import { unknownSerializer } from "./unknown.serializer.ts";

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
