import { Opcode } from "../enums/mod.ts";

export function booleanSerializer(value: boolean): Uint8Array {
  return new Uint8Array([value ? Opcode.True : Opcode.False]);
}
