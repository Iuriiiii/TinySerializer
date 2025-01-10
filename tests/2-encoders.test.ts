// deno-lint-ignore-file no-explicit-any

import { assertObjectMatch, test } from "@inspatial/test";
import { Database, unknownDeserializer, unknownSerializer } from "../mod.ts";
import type { DeserializeOptions, SerializeOptions } from "../types.ts";

// Test cases for encoder
test("encoder should modify values before serialization", () => {
  // Setup shared databases
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);

  // Setup options with encoder
  const options: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
    encoder: (value: any): any => {
      if (typeof value === "string") {
        return value.toUpperCase();
      }
      return value;
    },
  };

  // Create deserialize options sharing databases
  const deserializeOptions: DeserializeOptions = {
    offset: 0,
    objectDatabase,
    stringDatabase,
    deserializers: [],
  };

  const testData = {
    name: "test",
    age: 25,
  };

  // Serialize with encoder
  const serialized = unknownSerializer(testData, options);

  // Deserialize and verify
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as any, {
    name: "TEST",
    age: 25,
  });

  // Test null and undefined encoding
  test("encoder should handle null and undefined", () => {
    const objectDatabase = new Database<object | object[]>([]);
    const stringDatabase = new Database<string>([]);

    const options: SerializeOptions = {
      objectDatabase,
      stringDatabase,
      serializers: [],
      plainText: false,
      plainObject: false,
      encoder: (value: any): any => {
        if (value === null) {
          return undefined;
        }
        if (value === undefined) {
          return null;
        }
        return value;
      },
    };

    const deserializeOptions: DeserializeOptions = {
      offset: 0,
      objectDatabase,
      stringDatabase,
      deserializers: [],
    };

    const testData = {
      nullValue: null,
      undefinedValue: undefined,
      mixed: [null, undefined, "test"],
    };

    const serialized = unknownSerializer(testData, options);
    const deserialized = unknownDeserializer(serialized, deserializeOptions);

    assertObjectMatch(deserialized as any, {
      nullValue: undefined,
      undefinedValue: null,
      mixed: [undefined, null, "test"],
    });
  });
});

// Test number encoding
test("encoder should handle numbers", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);

  const options: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
    encoder: (value: any): any => {
      if (typeof value === "number" && Number.isFinite(value)) {
        return value * 10;
      }
      return value;
    },
  };

  const deserializeOptions: DeserializeOptions = {
    offset: 0,
    objectDatabase,
    stringDatabase,
    deserializers: [],
  };

  const testData = {
    integer: 42,
    float: 314,
    special: {
      infinity: Infinity,
      nan: NaN,
    },
  };

  const serialized = unknownSerializer(testData, options);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as any, {
    integer: 420,
    float: 3140,
    special: {
      infinity: Infinity,
      nan: NaN,
    },
  });
});

// Test nested object encoding
test("encoder should handle nested objects", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);

  const options: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
    encoder: (value: any): any => {
      if (typeof value === "object" && value !== null) {
        if ("count" in value) {
          value.count *= 2;
        }
        return value;
      }
      return value;
    },
  };

  const deserializeOptions: DeserializeOptions = {
    offset: 0,
    objectDatabase,
    stringDatabase,
    deserializers: [],
  };

  const testData = {
    item: {
      name: "test",
      count: 5,
    },
    active: true,
  };

  const serialized = unknownSerializer(testData, options);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as any, {
    item: {
      name: "test",
      count: 10,
    },
    active: true,
  });
});

// Test array encoding
test("encoder should handle arrays", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);

  const options: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
    encoder: (value: any): any => {
      if (Array.isArray(value)) {
        return value.map((item) => typeof item === "number" ? item * 2 : item);
      }
      return value;
    },
  };

  const deserializeOptions: DeserializeOptions = {
    offset: 0,
    objectDatabase,
    stringDatabase,
    deserializers: [],
  };

  const testData = {
    numbers: [1, 2, 3],
    labels: ["a", "b", "c"],
  };

  const serialized = unknownSerializer(testData, options);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as any, {
    numbers: [2, 4, 6],
    labels: ["a", "b", "c"],
  });
});

// Test boolean encoding
test("encoder should handle booleans", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);

  const options: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
    encoder: (value: any): any => {
      if (typeof value === "boolean") {
        return !value; // Invert boolean values
      }
      return value;
    },
  };

  const deserializeOptions: DeserializeOptions = {
    offset: 0,
    objectDatabase,
    stringDatabase,
    deserializers: [],
  };

  const testData = {
    isActive: true,
    isComplete: false,
    flags: [true, false, true],
  };

  const serialized = unknownSerializer(testData, options);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as any, {
    isActive: false,
    isComplete: true,
    flags: [false, true, false],
  });
});

// Test string pattern matching and replacement
test("encoder should handle string pattern matching", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);

  const options: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
    encoder: (value: any): any => {
      if (typeof value === "string") {
        // Replace numbers in strings with X
        return value.replace(/\d+/g, "X");
      }
      return value;
    },
  };

  const deserializeOptions: DeserializeOptions = {
    offset: 0,
    objectDatabase,
    stringDatabase,
    deserializers: [],
  };

  const testData = {
    code: "ABC123",
    version: "2.0.1",
    messages: ["test42", "hello123world", "noNumbers"],
  };

  const serialized = unknownSerializer(testData, options);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as any, {
    code: "ABCX",
    version: "X.X.X",
    messages: ["testX", "helloXworld", "noNumbers"],
  });
});

// Test bigint encoding (converting to number)
test("encoder should handle bigint conversion", () => {
  const objectDatabase = new Database<object | object[]>([]);
  const stringDatabase = new Database<string>([]);

  const options: SerializeOptions = {
    objectDatabase,
    stringDatabase,
    serializers: [],
    plainText: false,
    plainObject: false,
    encoder: (value: any): any => {
      if (typeof value === "bigint") {
        return Number(value / 2n); // Convert bigint to number and halve it
      }
      return value;
    },
  };

  const deserializeOptions: DeserializeOptions = {
    offset: 0,
    objectDatabase,
    stringDatabase,
    deserializers: [],
  };

  const testData = {
    regular: 100,
    bigValue: 200n,
    mixed: [50n, 100, 150n],
  };

  const serialized = unknownSerializer(testData, options);
  const deserialized = unknownDeserializer(serialized, deserializeOptions);

  assertObjectMatch(deserialized as any, {
    regular: 100,
    bigValue: 100,
    mixed: [25, 100, 75],
  });
});
