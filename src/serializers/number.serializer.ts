import type { SerializeOptions } from "../interfaces/mod.ts";
import { Opcode } from "../enums/mod.ts";
import { getNumberInfo, mergeBuffers } from "../utils/mod.ts";

/**
 * Serializes a number to a Uint8Array buffer.
 *
 * @param value - The number to serialize
 * @param _options - Ignored
 * @returns The serialized Uint8Array buffer of the number, including
 *          the opcode, size, and serialized value.
 */
export function numberSerializer(
  value: number,
  _options: SerializeOptions,
): Uint8Array {
  const { isSigned, byteSize, value: serializableValue } = getNumberInfo(value);

  const serializedSize = new Uint8Array([byteSize]);
  const opcode = isSigned ? Opcode.SignedNumber : Opcode.Number;
  const prefix = new Uint8Array([opcode]);

  const dataView = new DataView(new ArrayBuffer(8));
  dataView.setBigInt64(0, BigInt(serializableValue), true);

  const bytes = (new Uint8Array(dataView.buffer)).slice(0, byteSize);

  return mergeBuffers(prefix, serializedSize, bytes);
}
