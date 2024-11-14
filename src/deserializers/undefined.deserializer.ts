import type { DeserializeOptions } from "../interfaces/mod.ts";

export function undefinedDeserializer(options: DeserializeOptions): undefined {
  options.offset++;
  return;
}
