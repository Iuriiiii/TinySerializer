import { Opcode } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function byteSerializer(value: number, signed?: boolean): Uint8Array {
  return numberToBuffer(
    signed ? Opcode.Byte : Opcode.UByte,
    value,
  );
}
