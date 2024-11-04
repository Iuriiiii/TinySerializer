import { DeserializeOptions } from "../interfaces/mod.ts";

export function nullDeserializer(options: DeserializeOptions) {
    options.offset++;
    return null;
}
