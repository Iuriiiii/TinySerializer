import { Serialization } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function byteSerializer(value: number, signed?: boolean) {
  return numberToBuffer(
    signed ? Serialization.Byte : Serialization.UByte,
    value,
  );
}