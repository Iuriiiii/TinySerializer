import type { DeserializeOptions } from "../interfaces/mod.ts";

export function nanDeserializer(options: DeserializeOptions) {
  options.offset++;
  return NaN;
}
