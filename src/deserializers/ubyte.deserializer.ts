import type { DeserializeOptions } from "../interfaces/mod.ts";

export function ubyteDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  // const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  const result = serialized.at(options.offset)!;
  options.offset++;

  return result;
}
