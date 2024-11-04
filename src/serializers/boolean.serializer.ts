import { Serialization } from "../enums/mod.ts";

export function booleanSerializer(value: boolean) {
    return new Uint8Array([value ? Serialization.True : Serialization.False]);
}
