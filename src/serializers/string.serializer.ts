import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { numberSerializer } from "./number.serializer.ts";

export function stringSerializer(
  value: string,
  options: SerializeOptions,
): Uint8Array {
  const textBytes = new TextEncoder().encode(value);
  const prefix = new Uint8Array([Opcode.String]);
  const stringLength = numberSerializer(
    textBytes.length,
    options,
  );

  if (!options.plainText) {
    options.stringDatabase.getOrInsert(value);
  }

  return mergeBuffers(prefix, stringLength, textBytes);
}
