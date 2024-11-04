import { Serialization } from "../enums/mod.ts";
import { DeserializeOptions } from "../interfaces/mod.ts";

export function booleanDeserializer(
    serialized: Uint8Array,
    options: DeserializeOptions,
) {
    const currentOpcode = serialized.at(options.offset)!;
    options.offset++;
    return currentOpcode === Serialization.True;
}
