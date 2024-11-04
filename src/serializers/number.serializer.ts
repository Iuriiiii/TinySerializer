import { isByte, isDword, isQword, isWord } from "../validators/mod.ts";
import { byteSerializer } from "./byte.serializer.ts";
import { dwordSerializer } from "./dword.serializer.ts";
import { qwordSerializer } from "./qword.serializer.ts";
import { wordSerializer } from "./word.serializer.ts";

export function numberSerializer(value: number) {
    switch (true) {
        case isByte(value):
            return byteSerializer(value);
        case isWord(value):
            return wordSerializer(value);
        case isDword(value):
            return dwordSerializer(value);
        case isQword(value):
            return qwordSerializer(value);
        default:
            throw new Error("Invalid number");
    }
}
