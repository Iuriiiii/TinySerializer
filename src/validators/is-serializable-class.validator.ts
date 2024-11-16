import { SerializableClass } from "../abstractions/mod.ts";
import { isObject } from "@online/is";
import { serializableClasses } from "../singletons/mod.ts";
import { getClassName } from "../utils/mod.ts";

export function isSerializableClass(
  value: unknown,
): value is SerializableClass {
  return isObject(value) &&
    value instanceof SerializableClass &&
    serializableClasses.has(getClassName(value));
}
