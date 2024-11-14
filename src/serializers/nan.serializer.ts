import { Serialization } from "../enums/mod.ts";

export function nanSerializer(): Uint8Array {
  return new Uint8Array([Serialization.NaN]);
}
