import { Database } from "../classes/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { unknownSerializer } from "./unknown.serializer.ts";

/**
 * String databases only!
 */
export function databaseSerializer(database: Database<string>): Uint8Array {
  const options: SerializeOptions = {
    // Hacky
    stringDatabase: null as unknown as Database<string>,
    objectDatabase: new Database(),
    plainText: true,
    serializers: [],
  };

  const buffers = database
    .toArrayOfObjects()
    .map((row) => unknownSerializer(row.value, options));

  return mergeBuffers(...buffers);
}
