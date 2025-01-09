import type { DeserializeOptions } from "../interfaces/mod.ts";

/** Deserializer function */
export type DeserializeFunction = (
  serialized: Uint8Array,
  options: DeserializeOptions,
) => unknown;
