import type { Constructor } from "../types/mod.ts";
import { serializableClasses } from "../singletons/mod.ts";
import { SerializableClass } from "../abstractions/mod.ts";

export function Serializable(): (constructor: Constructor) => Constructor {
  return function (constructor: Constructor) {
    if (!(constructor.prototype instanceof SerializableClass)) {
      throw new Error(
        `The class must extend "SerializableClass" abtract class.`,
      );
    }

    serializableClasses.set(constructor.name, constructor);

    return constructor;
  };
}
