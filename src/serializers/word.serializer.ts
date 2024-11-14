import { Serialization } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function wordSerializer(value: number, signed?: boolean): Uint8Array {
  return numberToBuffer(
    signed ? Serialization.Word : Serialization.UWord,
    value,
  );
}
