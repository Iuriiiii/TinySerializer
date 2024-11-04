import { Serialization } from "../enums/mod.ts";
import { numberToBytes } from "./number-to-bytes.util.ts";

// Thanks ChatGPT.
export function numberToBuffer(
    type:
        | Serialization.Byte
        | Serialization.Word
        | Serialization.DWord
        | Serialization.QWord,
    value: number,
) {
    const size = (() => {
        switch (type) {
            case Serialization.Byte:
                return 1;
            case Serialization.Word:
                return 2;
            case Serialization.DWord:
                return 4;
            case Serialization.QWord:
                return 8;
        }
    })();
    const bytes = [type, ...numberToBytes(value, size)];

    return new Uint8Array(bytes);
}
