import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";

export function booleanDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): boolean {
  const currentOpcode = serialized.at(options.offset)!;
  options.offset++;
  return currentOpcode === Opcode.True;
}
