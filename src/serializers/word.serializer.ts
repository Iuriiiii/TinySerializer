import { Serialization } from "../enums/mod.ts";
import { numberToBuffer } from "../utils/mod.ts";

export function wordSerializer(value: number) {
    return numberToBuffer(Serialization.Word, value);
}
