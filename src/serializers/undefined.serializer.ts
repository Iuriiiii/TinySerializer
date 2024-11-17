import { Opcode } from "../enums/mod.ts";

export function undefinedSerializer(): Uint8Array {
  return new Uint8Array([Opcode.Undefined]);
}
