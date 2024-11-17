import type { SerializeOptions } from "../interfaces/mod.ts";
import type { SerializableClass } from "../abstractions/mod.ts";
import { objectSerializer } from "./object.serializer.ts";
import { getClassName, mergeBuffers } from "../utils/mod.ts";
import { stringSerializer } from "./string.serializer.ts";
import { Opcode } from "../enums/mod.ts";

export function classSerializer(
  value: SerializableClass,
  options: SerializeOptions,
) {
  const className = getClassName(value);
  const serializedClass = value.serialize();
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
