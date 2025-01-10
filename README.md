# TinySerializer

A lightweight, efficient binary serializer for TypeScript and JavaScript that supports cyclic references, custom serializers, and class serialization.

## Features

- Binary serialization/deserialization
- Cyclic reference handling
- Class serialization with inheritance support
- Custom serializer support
- TypeScript support with type safety
- Lightweight with zero dependencies
- String and object deduplication

## Installation

```bash
deno add tinyserializer
```

## Basic Usage

```typescript
import { unknownSerializer, unknownDeserializer } from "./src/mod.ts";

// Create some data
const data = {
  name: "John",
  age: 30,
  hobbies: ["reading", "gaming"]
};

// Serialize
const serialized = unknownSerializer(data, {
  objectDatabase: new Database([]),
  stringDatabase: new Database([]),
  serializers: [],
  plainText: false,
  plainObject: false
});

// Deserialize
const deserialized = unknownDeserializer(serialized, {
  objectDatabase: new Database([]),
  stringDatabase: new Database([]),
  deserializers: [],
  offset: 0
});

console.log(deserialized); // Original data structure
```

## Class Serialization

```typescript
import { Serializable, SerializableClass } from "./src/mod.ts";

@Serializable()
class User extends SerializableClass {
  constructor(
    public name: string,
    public age: number
  ) {
    super();
  }
}

const user = new User("John", 30);
const serialized = unknownSerializer(user, options);
const deserialized = unknownDeserializer(serialized, options);
```

## Custom Serializers

```typescript
import { SerializerFunction, DeserializeFunction } from "./src/mod.ts";

const dateSerializer: SerializerFunction = (value, options) => {
  if (value instanceof Date) {
    return numberSerializer(value.getTime(), options);
  }
  return null;
};

const dateDeserializer: DeserializeFunction = (serialized, options) => {
  const timestamp = numberDeserializer(serialized, options);
  return new Date(timestamp);
};
```

## API Reference

### Main Functions

- `unknownSerializer(value: unknown, options: SerializeOptions): Uint8Array`
- `unknownDeserializer(serialized: Uint8Array, options: DeserializeOptions): unknown`

### Classes

- `SerializableClass`: Base class for serializable classes
- `Database<T>`: Utility class for handling references

### Decorators

- `@Serializable()`: Marks a class as serializable

### Options

#### SerializeOptions
```typescript
interface SerializeOptions {
  objectDatabase: Database<object | object[]>;
  stringDatabase: Database<string>;
  serializers: SerializerFunction[];
  plainText: boolean;
  plainObject: boolean;
  encoder?: Encoder;
}
```

#### DeserializeOptions
```typescript
interface DeserializeOptions {
  objectDatabase: Database<object | object[]>;
  stringDatabase: Database<string>;
  deserializers: DeserializeFunction[];
  offset: number;
  decoder?: Decoder;
}
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request