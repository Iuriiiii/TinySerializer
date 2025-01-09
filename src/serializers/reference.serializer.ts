import type { SerializeOptions } from "../interfaces/mod.ts";
import { isArray, isUndefined } from "@online/is";
import { arraySerializer } from "./array.serializer.ts";
import { objectSerializer } from "./object.serializer.ts";
import { Opcode } from "../enums/mod.ts";

/**
 * Serializes a reference to an array or object. If the object is not in the
 * database, it serializes the object itself.
 *
 * @param value - The array or object to serialize.
 * @param options - The serialize options.
 * @returns A Uint8Array containing the serialized reference.
 */
export function referenceSerializer(
  value: unknown[] | object,
  options: SerializeOptions,
): Uint8Array {
  const objectId = options.objectDatabase.get(value);

  if (!isUndefined(objectId)) {
    return new Uint8Array([Opcode.Reference, objectId]);
  }

  options.objectDatabase.getOrInsert(value);

  if (isArray(value)) {
    return arraySerializer(value, options);
  }

  return objectSerializer(value, options);
}
