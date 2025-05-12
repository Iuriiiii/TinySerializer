// deno-lint-ignore-file
import type { Constructor } from "../types/mod.ts";
import { serializableClasses } from "../singletons/mod.ts";
import { SerializableClass } from "../abstractions/mod.ts";

/**
 * Decorator that marks a class as serializable.
 *
 * The class must extend "SerializableClass" abstract class.
 * The class will be registered in the "serializableClasses" singleton.
 *
 * @throws {Error} The class must extend "SerializableClass" abstract class.
 */
export function Serializable(): (constructor: Constructor) => any {
  return function (constructor: Constructor) {
    if (!(constructor.prototype instanceof SerializableClass)) {
      throw new Error(
        `The class must extend "SerializableClass" abstract class.`,
      );
    }

    serializableClasses.set(constructor.name, constructor);

    return constructor;
  };
}
