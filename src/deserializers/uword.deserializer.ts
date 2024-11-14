import type { DeserializeOptions } from "../interfaces/mod.ts";

export function uwordDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  options.offset++;
  const result = serialized.at(options.offset)! +
    (serialized.at(options.offset + 1)! << 8);
  options.offset += 2;

  return result;
}
