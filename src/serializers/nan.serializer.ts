import { Opcode } from "../enums/mod.ts";

export function nanSerializer(): Uint8Array {
  return new Uint8Array([Opcode.NaN]);
}
