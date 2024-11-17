import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";

export function infinityDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  return currentOpcode === Opcode.Infinity ? Infinity : -Infinity;
}
