import type { DeserializeOptions } from "../interfaces/mod.ts";

export function undefinedDeserializer(options: DeserializeOptions) {
  options.offset++;
  return;
}
