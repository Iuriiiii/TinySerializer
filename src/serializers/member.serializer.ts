import { Serialization } from "../enums/mod.ts";
import { SerializeOptions } from "../interfaces/mod.ts";
import { mergeBuffers } from "../utils/mod.ts";
import { unknownSerializer } from "./unknown.serializer.ts";

export function memberSerializer(
    value: [string, unknown],
    options: SerializeOptions,
) {
    const [key, val] = value;
    const keyId = options.stringDatabase.getOrInsert(key);
    const valueBuffer = unknownSerializer(val, options);
    const prefix = new Uint8Array([Serialization.Member, keyId]);

    return mergeBuffers(prefix, valueBuffer);
}
