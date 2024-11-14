import type { DeserializeOptions } from "../interfaces/mod.ts";

export function wordDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  // const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  let result = serialized.at(options.offset)! +
    (serialized.at(options.offset + 1)! << 8);

  if (result > 32767) {
    result -= 65536;
  }

  options.offset += 2;

  return result;
}
