import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";

export function numberDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  const currentOpcode = serialized.at(options.offset)!;

  options.offset++;
  const size = serialized.at(options.offset)!;
  options.offset++;

  const serializedNumber = serialized.slice(
    options.offset,
    options.offset + size,
  );
  options.offset += size;

  const bytes = new Uint8Array(
    [...serializedNumber, 0, 0, 0, 0, 0, 0, 0, 0].slice(
      0,
      8,
    ),
  );

  const dataView = new DataView(bytes.buffer);
  const deserializedNumber = dataView.getBigInt64(0, true);

  switch (true) {
    case currentOpcode === Opcode.Number:
      return Number(deserializedNumber) as number;
    case currentOpcode === Opcode.SignedNumber:
      return -Number(deserializedNumber) as number;
    default:
      return 0;
  }
}
