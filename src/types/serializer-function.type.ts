import type { SerializeOptions } from "../interfaces/mod.ts";

export type SerializerFunction = (
  // deno-lint-ignore no-explicit-any
  value: any,
  options: SerializeOptions,
) => Uint8Array | null;
