import { Serialization } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

export function arrayDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): unknown[] {
  const result = [];

  options.offset++;
  while (true) {
    const value = unknownDeserializer(serialized, options);
    // break;
    const opcode = serialized.at(options.offset)!;
    if (opcode === undefined || opcode === Serialization.EndArray) {
      if (opcode === Serialization.EndArray) {
        result.push(value);
      }
      break;
    }

    result.push(value);
  }
  options.offset++;

  return result;
}
