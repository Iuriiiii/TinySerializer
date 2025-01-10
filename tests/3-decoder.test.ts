// deno-lint-ignore-file no-explicit-any
import { assertEquals, assertObjectMatch, test } from "@inspatial/test";
import { DecoderValueType } from "../src/enums/decoder-value-type.enum.ts";
import type { SerializeOptions } from "../src/interfaces/serialize-options.interface.ts";
import type { DeserializeOptions } from "../src/interfaces/deserialize-options.interface.ts";
import { Database } from "../src/classes/database.util.ts";
import { unknownSerializer } from "../src/serializers/unknown.serializer.ts";
import { unknownDeserializer } from "../src/deserializers/unknown.deserializer.ts";
import type { Decoder } from "../src/types/decoder.type.ts";

test("Decoder should handle plain values correctly", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);
  let lastDecodedValue: any;
  let lastDecoderContext: any;

  const decoder: Decoder<DecoderValueType> = (value, context) => {
    lastDecodedValue = value;
    lastDecoderContext = context;
    return value;
  };

  const serializeOptions: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
  };

  const deserializeOptions: DeserializeOptions = {
    ...serializeOptions,
    offset: 0,
    deserializers: [],
    decoder,
  };

  const value = "test string";
  const serialized = unknownSerializer(value, serializeOptions);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertEquals(deserialized, value);
  assertEquals(lastDecodedValue, value);
  assertObjectMatch(lastDecoderContext, {
    type: DecoderValueType.Plain,
  });
});

test("Decoder should handle object members correctly", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);
  const decodedMembers: Record<string, any> = {};

  const decoder: Decoder<DecoderValueType.Member> = (value, context) => {
    if (context.type === DecoderValueType.Member && context.member) {
      decodedMembers[context.member] = value;
    }
    return value;
  };

  const serializeOptions: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
  };

  const deserializeOptions: DeserializeOptions = {
    ...serializeOptions,
    offset: 0,
    deserializers: [],
    decoder,
  };

  const testObj = { name: "test", value: 42 };
  const serialized = unknownSerializer(testObj, serializeOptions);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as object, testObj);
  assertObjectMatch(decodedMembers, {
    name: "test",
    value: 42,
  });
});

test("Decoder should handle nested objects and arrays", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);
  const decodedObjects: any[] = [];

  const decoder: Decoder<DecoderValueType> = (value, context) => {
    if (context.type === DecoderValueType.Object) {
      decodedObjects.push(value);
    }
    return value;
  };

  const serializeOptions: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
  };

  const deserializeOptions: DeserializeOptions = {
    ...serializeOptions,
    offset: 0,
    deserializers: [],
    decoder,
  };

  const testObj = {
    outer: {
      inner: {
        value: "nested",
      },
    },
    array: [{ id: 1 }, { id: 2 }],
  };

  const serialized = unknownSerializer(testObj, serializeOptions);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as object, testObj);
  assertEquals(decodedObjects.length, 5); // Main object, outer, inner, and two array objects
});

test("Decoder should handle null and undefined values", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);
  const decodedValues: any[] = [];

  const decoder: Decoder = (value, context) => {
    if (context.type === DecoderValueType.Plain) {
      decodedValues.push(value);
    }
    return value;
  };

  const serializeOptions: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
  };

  const deserializeOptions: DeserializeOptions = {
    ...serializeOptions,
    offset: 0,
    deserializers: [],
    decoder,
  };

  const testObj = {
    nullValue: null,
    undefinedValue: undefined,
    defined: "exists",
  };

  const serialized = unknownSerializer(testObj, serializeOptions);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as object, {
    nullValue: null,
    defined: "exists",
  });
  assertEquals(decodedValues.includes(null), true);
  assertEquals(decodedValues.includes(undefined), true);
  assertEquals(decodedValues.includes("exists"), true);
});
