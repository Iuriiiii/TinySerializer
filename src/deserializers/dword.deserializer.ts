import { DeserializeOptions } from "../interfaces/mod.ts";

export function dwordDeserializer(
    serialized: Uint8Array,
    options: DeserializeOptions,
) {
    // const currentOpcode = serialized.at(options.offset)!;
    options.offset++;
    const result = serialized.at(options.offset)! +
        (serialized.at(options.offset + 1)! << 8) +
        (serialized.at(options.offset + 2)! << 16) +
        (serialized.at(options.offset + 3)! << 24);
    options.offset += 4;

    return result;
}
