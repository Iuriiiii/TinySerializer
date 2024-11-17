import { isArray } from "@online/is";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { arraySerializer } from "./array.serializer.ts";
import { objectSerializer } from "./object.serializer.ts";
import { Opcode } from "../enums/mod.ts";

export function referenceSerializer(
  value: unknown[] | object,
  options: SerializeOptions,
): Uint8Array {
  const objectId = options.objectDatabase.rows.get(value);

  if (objectId === undefined) {
    options.objectDatabase.getOrInsert(value);

    if (isArray(value)) {
      return arraySerializer(value, options);
    }

    return objectSerializer(value, options);
  }

  return new Uint8Array([Opcode.Reference, objectId]);
}
