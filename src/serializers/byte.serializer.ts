import { Serialization } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function byteSerializer(value: number) {
    return numberToBuffer(Serialization.Byte, value);
}
