import type { DeserializeOptions } from "../interfaces/mod.ts";

export function dwordDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  // const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  let result = serialized.at(options.offset)! +
    (serialized.at(options.offset + 1)! << 8) +
    (serialized.at(options.offset + 2)! << 16) +
    (serialized.at(options.offset + 3)! << 24);

  if (result > 2147483647) {
    result -= 4294967296;
  }

  options.offset += 4;

  return result;
}
