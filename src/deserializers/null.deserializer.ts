import type { DeserializeOptions } from "../interfaces/mod.ts";

export function nullDeserializer(options: DeserializeOptions): null {
  options.offset++;
  return null;
}
