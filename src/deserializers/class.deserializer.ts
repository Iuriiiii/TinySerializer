// deno-lint-ignore-file
import type { DeserializeOptions, SerializedClass } from "../interfaces/mod.ts";
import { serializableClasses } from "../singletons/mod.ts";
import { objectDeserializer } from "./object.deserializer.ts";
import { stringDeserializer } from "./string.deserializer.ts";

/**
 * Deserializes a class instance from a serialized Uint8Array buffer.
 *
 * @param serialized - The buffer containing the serialized class data.
 * @param options - Options to control the deserialization process.
 * @returns The deserialized class instance, or null if deserialization fails.
 *
 * The function first increments the offset, extracts the class name using
 * `stringDeserializer`, and retrieves the corresponding class constructor
 * from `serializableClasses`. The class content is deserialized using
 * `objectDeserializer`. If the class has a custom `deserialize` method,
 * it is used to deserialize the class content. Otherwise, a new instance
 * is created using the deserialized arguments, and its members are
 * populated with the deserialized members.
 */
export function classDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): object | null {
  options.offset++;

  const className = stringDeserializer(serialized, options);
  const clazz = serializableClasses.get(className)!;
  const deserializedClassContent = objectDeserializer(
    serialized,
    { ...options, decoder: undefined },
  ) as SerializedClass<any>;

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
