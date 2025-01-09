import { Opcode } from "../enums/mod.ts";

/**
 * Serializes undefined into a Uint8Array.
 *
 * @returns The serialized undefined value
 */
export function undefinedSerializer(): Uint8Array {
  return new Uint8Array([Opcode.Undefined]);
}
