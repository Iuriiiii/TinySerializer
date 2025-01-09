// deno-lint-ignore-file
import type { SerializedClass } from "../interfaces/mod.ts";

/**
 * Represents a class that can be serialized.
 */
export abstract class SerializableClass {
  /**
   * 
   * @param serialized - The serialized class data
   * @returns The current class.
   */
  public static deserialize?(serialized: Partial<SerializedClass<any>>): any;
}
