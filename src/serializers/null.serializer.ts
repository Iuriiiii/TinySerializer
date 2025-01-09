import { Opcode } from "../enums/mod.ts";

/**
 * Serializes null into a Uint8Array.
 *
 * @returns The serialized null value
 */
export function nullSerializer(): Uint8Array {
  return new Uint8Array([Opcode.Null]);
}
