import { Opcode } from "../enums/mod.ts";

/**
 * Serializes NaN into a Uint8Array.
 *
 * @returns The serialized NaN
 */
export function nanSerializer(): Uint8Array {
  return new Uint8Array([Opcode.NaN]);
}
