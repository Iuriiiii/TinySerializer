import type {
  DeserializeOptions,
  SerializedClass,
  SerializeOptions,
} from "./src/interfaces/mod.ts";

import type {
  DeserializeFunction,
  RequireAtLeastOne,
  SerializerFunction,
} from "./src/types/mod.ts";

export { NumberSerializationType, Opcode } from "./src/enums/mod.ts";

export * from "./src/abstractions/mod.ts";

export type {
  DeserializeFunction,
  DeserializeOptions,
  RequireAtLeastOne,
  SerializedClass,
  SerializeOptions,
  SerializerFunction,
};
