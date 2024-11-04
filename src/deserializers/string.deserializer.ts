import { Database } from "../classes/mod.ts";
import { Serialization, StringType } from "../enums/mod.ts";
import { DeserializeOptions } from "../interfaces/mod.ts";
import {
    getStringType,
    numberToBytes,
    stringTypeToByteSize,
} from "../utils/mod.ts";
import { numberDeserializer } from "./number.deserializer.ts";

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
export function stringDeserializer(
    serialized: Uint8Array,
    options: DeserializeOptions,
) {
    const currentOpcode = serialized.at(options.offset)!;
    const stringType = (currentOpcode - Serialization.String) as StringType;
    // Move pointer to string length
    options.offset++;
    const stringLength = numberDeserializer(
        serialized,
        options,
        stringTypeToByteSize(stringType),
    );

    const _string = serialized.slice(
        options.offset,
        options.offset + stringLength,
    ).toString();

    options.offset += stringLength;

    return _string;
}
