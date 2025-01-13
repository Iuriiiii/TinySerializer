import type { Database } from "../classes/mod.ts";
import type { SerializerFunction } from "../types/mod.ts";

/**
 * Options for serializing.
 */
export interface SerializeOptions {
  /**
   * The object database.
   */

  objectDatabase: Database<object | object[]>;
  /**
   * The string database.
   */

  stringDatabase: Database<string>;
  /**
   * The custom serializers.
   */

  serializers: SerializerFunction[];
  /**
   * Set to true to do not use the string database.
   */

  plainText: boolean;
  /**
   * Set to true to do not use the object database.
   */

  plainObject: boolean;
}
