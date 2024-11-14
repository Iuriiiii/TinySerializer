import { Serialization } from "../enums/mod.ts";

export function nullSerializer(): Uint8Array {
  return new Uint8Array([Serialization.Null]);
}
