import { Serialization } from "../enums/mod.ts";

export function nanSerializer() {
    return new Uint8Array([Serialization.NaN]);
}
