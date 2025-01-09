import type { SerializeOptions } from "../interfaces/mod.ts";
import type { SerializableClass } from "../abstractions/mod.ts";
import { objectSerializer } from "./object.serializer.ts";
import { classToObject, getClassName, mergeBuffers } from "../utils/mod.ts";
import { stringSerializer } from "./string.serializer.ts";
import { Opcode } from "../enums/mod.ts";

/**
 * Serializes a class instance to a Uint8Array buffer.
 *
 * @param value - The class instance to serialize.
 * @param options - The options for serialization, including the object database
 *                  and current offset.
 * @returns The serialized Uint8Array buffer of the class instance, including
 *          the class name and serialized members.
 */
export function classSerializer(
  value: SerializableClass,
  options: SerializeOptions,
) {
  const className = getClassName(value);
  const serializedClass = classToObject(value);
  const prefix = new Uint8Array([Opcode.Class]);
  const serializedClassName = stringSerializer(className, options);
  const serializedSerializedClassName = objectSerializer(
    serializedClass,
    options,
  );

  return mergeBuffers(
    prefix,
    serializedClassName,
    serializedSerializedClassName,
  );
}
