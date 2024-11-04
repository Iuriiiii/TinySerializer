import { Serialization } from "../enums/mod.ts";

export function infinitySerializer(negative?: boolean) {
    return new Uint8Array([
        negative ? Serialization.NegativeInfinity : Serialization.Infinity,
    ]);
}
