import { Serialization } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function dwordSerializer(value: number, signed?: boolean): Uint8Array {
  return numberToBuffer(
    signed ? Serialization.DWord : Serialization.UDWord,
    value,
  );
}
