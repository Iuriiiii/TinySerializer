import type {
  DeserializeOptions,
  SerializeOptions,
} from "./src/interfaces/mod.ts";
import { Database } from "./src/classes/mod.ts";
import { unknownDeserializer } from "./src/deserializers/mod.ts";
import { unknownSerializer } from "./src/serializers/mod.ts";
import { mergeBuffers } from "./src/utils/merge-buffers.util.ts";

export { mergeBuffers };
export * from "./src/deserializers/mod.ts";
export * from "./src/serializers/mod.ts";
export * from "./src/classes/mod.ts";
export * from "./src/decorators/mod.ts";

export interface ISerializeDeserializeResponse<T> {
  value: T;
  objectDatabase: Database<object>;
  stringDatabase: Database<string>;
}

export function serialize(
  value: unknown,
  options?: Partial<SerializeOptions>,
): ISerializeDeserializeResponse<Uint8Array> {
  const objectDatabase = options?.objectDatabase ?? new Database<object>();
  const stringDatabase = options?.stringDatabase ?? new Database<string>();
  const buffer = unknownSerializer(value, {
    objectDatabase,
    stringDatabase,
    plainText: options?.plainText ?? false,
    plainObject: options?.plainObject ?? false,
    serializers: options?.serializers ?? [],
  });

  const result = {
    value: buffer,
    objectDatabase,
    stringDatabase,
  } satisfies ISerializeDeserializeResponse<Uint8Array>;

  return result;
}

export function deserialize<T = unknown>(
  buffer: Uint8Array,
  options?: Partial<DeserializeOptions>,
): ISerializeDeserializeResponse<T> {
  const objectDatabase = options?.objectDatabase ?? new Database<object>();
  const stringDatabase = options?.stringDatabase ?? new Database<string>();
  const value = unknownDeserializer(buffer, {
    offset: options?.offset ?? 0,
    objectDatabase,
    stringDatabase,
    deserializers: options?.deserializers ?? [],
  }) as T;

  const result = {
    value,
    objectDatabase,
    stringDatabase,
  } satisfies ISerializeDeserializeResponse<T>;

  return result;
}
