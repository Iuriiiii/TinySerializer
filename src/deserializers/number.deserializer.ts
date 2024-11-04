import { DeserializeOptions } from "../interfaces/mod.ts";
import { byteDeserializer } from "./byte.deserializer.ts";
import { wordDeserializer } from "./word.deserializer.ts";
import { dwordDeserializer } from "./dword.deserializer.ts";
import { qwordDeserializer } from "./qword.deserializer.ts";

export function numberDeserializer(
    serialized: Uint8Array,
    options: DeserializeOptions,
    /**
     * Bytes to read.
     */
    bytes: number,
) {
    switch (true) {
        case bytes === 1:
            return byteDeserializer(serialized, options);
        case bytes === 2:
            return wordDeserializer(serialized, options);
        case bytes === 4:
            return dwordDeserializer(serialized, options);
        case bytes === 8:
            return qwordDeserializer(serialized, options);
        default:
            throw new Error("Invalid number size");
    }
}
