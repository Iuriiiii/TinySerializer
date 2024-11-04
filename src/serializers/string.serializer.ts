import { Database } from "../classes/mod.ts";
import { Serialization } from "../enums/mod.ts";
import { SerializeOptions } from "../interfaces/mod.ts";
import {
    getStringType,
    numberToBytes,
    stringTypeToByteSize,
} from "../utils/mod.ts";

/**
 * With database:
 * Output: 3 bytes.
 * Byte 0: Serialization.String + StringType
 * Byte 1-2: String ID (Word)
 *
 * Without database:
 * Byte 0: Serialization.String + StringType
 * Byte 1-2: String Length (n)
 * Byte 3-n: String
 */
export function stringSerializer(value: string, options: SerializeOptions) {
    const stringType = getStringType(value);
    const textBytes = new TextEncoder().encode(value);
    const bytes = [
        Serialization.String + stringType,
        ...numberToBytes(
            textBytes.length,
            stringTypeToByteSize(stringType),
        ),
        ...textBytes,
    ];

    options.stringDatabase.getOrInsert(value);
    return new Uint8Array(bytes);
}
