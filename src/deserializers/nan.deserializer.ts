import type { DeserializeOptions } from "../interfaces/mod.ts";

export function nanDeserializer(options: DeserializeOptions): number {
  options.offset++;
  return NaN;
}
