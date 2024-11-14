import type { DeserializeOptions } from "../interfaces/mod.ts";

export function byteDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  // const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  let result = serialized.at(options.offset)!;

  if (result > 127) {
    result -= 256;
  }

  options.offset++;

  return result;
}
