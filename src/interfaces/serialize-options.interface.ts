import type { Database } from "../classes/mod.ts";
import type { Encoder, SerializerFunction } from "../types/mod.ts";

export interface SerializeOptions {
  objectDatabase: Database<object | object[]>;
  stringDatabase: Database<string>;
  serializers: SerializerFunction[];
  plainText: boolean;
  plainObject: boolean;
  encoder?: Encoder;
}
