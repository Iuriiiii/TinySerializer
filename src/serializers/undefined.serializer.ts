import { Serialization } from "../enums/mod.ts";

export function undefinedSerializer(): Uint8Array {
  return new Uint8Array([Serialization.Undefined]);
}
