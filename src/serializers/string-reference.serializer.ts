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
export function stringReferenceSerializer(
    value: string,
    options: SerializeOptions,
) {
    const stringType = getStringType(value);
    const valueId = options.stringDatabase.getOrInsert(value);
    const bytes = [
        Serialization.StringReference + stringType,
        ...numberToBytes(valueId, 2),
    ];

    return new Uint8Array(bytes);
}
