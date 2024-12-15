// deno-lint-ignore-file
import type { DeserializeOptions, SerializedClass } from "../interfaces/mod.ts";
import { serializableClasses } from "../singletons/mod.ts";
import { objectDeserializer } from "./object.deserializer.ts";
import { stringDeserializer } from "./string.deserializer.ts";

export function classDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): object | null {
  options.offset++;

  const className = stringDeserializer(serialized, options);
  const deserializedClassContent = objectDeserializer(
    serialized,
    options,
  ) as SerializedClass<any>;

  const clazz = serializableClasses.get(className)!;

  if ("deserialize" in clazz && clazz.deserialize instanceof Function) {
    return clazz.deserialize(deserializedClassContent);
  }

  const {
    members: deserializedMembers = {},
    arguments: deserializedArguments = [],
  } = deserializedClassContent;

  return Object.assign(
    new clazz(...deserializedArguments),
    deserializedMembers,
  );
}
