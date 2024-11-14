import { Serialization } from "../enums/mod.ts";

export function nullSerializer() {
  return new Uint8Array([Serialization.Null]);
}
