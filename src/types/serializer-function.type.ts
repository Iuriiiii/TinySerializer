import type { SerializeOptions } from "../interfaces/mod.ts";

export type SerializerFunction = (
  value: unknown,
  options: SerializeOptions,
) => Uint8Array | null;
