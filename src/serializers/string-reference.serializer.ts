import { NumberSerializationType, Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { getStringType, mergeBuffers } from "../utils/mod.ts";
import { numberSerializer } from "./number.serializer.ts";

export function stringReferenceSerializer(
  value: string,
  options: SerializeOptions,
): Uint8Array {
  const stringType = getStringType(value);
  const valueId = options.stringDatabase.getOrInsert(value);
  const prefix = new Uint8Array([Opcode.StringReference + stringType]);
  const serializedStringId = numberSerializer(
    valueId,
    NumberSerializationType.Unsigned,
  );

  return mergeBuffers(prefix, serializedStringId);
}
