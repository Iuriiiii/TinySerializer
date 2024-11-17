import { Opcode } from "../enums/mod.ts";

export function infinitySerializer(negative?: boolean): Uint8Array {
  return new Uint8Array([
    negative ? Opcode.NegativeInfinity : Opcode.Infinity,
  ]);
}
