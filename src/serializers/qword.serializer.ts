import { Serialization } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function qwordSerializer(value: number): Uint8Array {
  return numberToBuffer(Serialization.QWord, value);
}
