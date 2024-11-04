import { Serialization } from "../enums/mod.ts";

export function undefinedSerializer() {
    return new Uint8Array([Serialization.Undefined]);
}
