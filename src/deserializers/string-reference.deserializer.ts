import { DeserializeOptions } from "../interfaces/mod.ts";
import { wordDeserializer } from "./word.deserializer.ts";

export function stringReferenceDeserializer(
    serialized: Uint8Array,
    options: DeserializeOptions,
) {
    const stringId = wordDeserializer(serialized, options);
    const _string = options.stringDatabase.get(stringId)!;

    if (!_string) {
        throw new Error(`String #${stringId} not found`);
    }

    return _string;
}
