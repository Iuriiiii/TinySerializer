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
  const serializedClass = objectDeserializer(
    serialized,
    options,
    // deno-lint-ignore no-explicit-any
  ) as SerializedClass<any>;

  const clazz = serializableClasses.get(className)!;
  const clazzInstance = new clazz(...serializedClass.arguments);
  Object.assign(clazzInstance, serializedClass.members);

  return clazzInstance;
}
