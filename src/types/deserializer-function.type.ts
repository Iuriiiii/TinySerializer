import type { DeserializeOptions } from "../interfaces/mod.ts";

export type DeserializeFunction = (
  serialized: Uint8Array,
  options: DeserializeOptions,
) => unknown;
