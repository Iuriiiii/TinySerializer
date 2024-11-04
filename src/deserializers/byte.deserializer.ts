import { DeserializeOptions } from "../interfaces/mod.ts";

export function byteDeserializer(
    serialized: Uint8Array,
    options: DeserializeOptions,
) {
    // const currentOpcode = serialized.at(options.offset)!;
    options.offset++;
    const result =  serialized.at(options.offset)!;
    options.offset++;

    return result;
}
