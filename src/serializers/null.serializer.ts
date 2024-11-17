import { Opcode } from "../enums/mod.ts";

export function nullSerializer(): Uint8Array {
  return new Uint8Array([Opcode.Null]);
}
