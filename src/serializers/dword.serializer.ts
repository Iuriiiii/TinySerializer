import { Serialization } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function dwordSerializer(value: number) {
    return numberToBuffer(Serialization.DWord, value);
}
