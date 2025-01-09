import { Opcode } from "../enums/mod.ts";

/**
 * Serializes a positive or negative infinity value.
 *
 * @param negative - If true, serializes negative infinity, otherwise positive.
 * @returns The serialized value.
 */
export function infinitySerializer(negative?: boolean): Uint8Array {
  return new Uint8Array([
    negative ? Opcode.NegativeInfinity : Opcode.Infinity,
  ]);
}
