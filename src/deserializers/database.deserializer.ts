import { Database } from "../classes/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { unknownSerializer } from "./unknown.deserializer.ts";

/**
 * String databases only!
 */
export function databaseSerializer(database: Database<string>) {
  const options: SerializeOptions = {
    // Hacky
    stringDatabase: null as unknown as Database<string>,
    objectDatabase: new Database(),
  };

  const buffers = database
    .toArrayOfObjects()
    .map((row) => unknownSerializer(row.value, options));

  return mergeBuffers(...buffers);
}
