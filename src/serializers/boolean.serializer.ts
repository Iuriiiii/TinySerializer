import { Opcode } from "../enums/mod.ts";

/**
 * Serializes a boolean value into a Uint8Array.
 *
 * @param value - The boolean value to serialize
 * @returns The serialized boolean value
 *
 * The function returns a Uint8Array with a single element, which is either
 * Opcode.True or Opcode.False.
 */
export function booleanSerializer(value: boolean): Uint8Array {
  return new Uint8Array([value ? Opcode.True : Opcode.False]);
}
