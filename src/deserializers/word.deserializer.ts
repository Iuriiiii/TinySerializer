import { DeserializeOptions } from "../interfaces/mod.ts";

export function wordDeserializer(
    serialized: Uint8Array,
    options: DeserializeOptions,
) {
    // const currentOpcode = serialized.at(options.offset)!;
    options.offset++;
    const result = serialized.at(options.offset)! +
        (serialized.at(options.offset + 1)! << 8);
    options.offset += 2;

    return result;
}
