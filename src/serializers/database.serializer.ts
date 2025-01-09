import { Database } from "../classes/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { unknownSerializer } from "./unknown.serializer.ts";

/**
 * Serializes a Database<string> into a Uint8Array.
 * 
 * @param database The Database<string> to serialize.
 * @param options The SerializeOptions to use.
 * @returns A Uint8Array containing the serialized Database.
 */
export function databaseSerializer(
  database: Database<string>,
  options: SerializeOptions,
): Uint8Array {
  const _options: SerializeOptions = {
    // Hacky
    stringDatabase: options?.stringDatabase ??
      null as unknown as Database<string>,
    objectDatabase: options?.objectDatabase ?? new Database(),
    serializers: options?.serializers ?? [],
    plainText: true,
    plainObject: true,
  };
  const values = database
    .toArrayOfObjects()
    .map(({ value }) => value);

  const buffers = unknownSerializer(values, _options);

  return buffers;
}
