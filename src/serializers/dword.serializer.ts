import { Opcode } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function dwordSerializer(value: number, signed?: boolean): Uint8Array {
  return numberToBuffer(
    signed ? Opcode.DWord : Opcode.UDWord,
    value,
  );
}
