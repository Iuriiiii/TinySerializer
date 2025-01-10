import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

/**
 * Deserializes an array.
 *
 * @param serialized - The whole serialized array
 * @param options - The deserialize options
 * @returns - Returns the deserialized array
 */
export function arrayDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): unknown[] {
  const result: unknown[] = [];
  const currentOffset = options.offset;
  options.offset++;
  options.objectDatabase.getOrInsert(result);

  while (true) {
    const value = unknownDeserializer(serialized, options);
    const opcode = serialized.at(options.offset)!;

    if (opcode === undefined || opcode === Opcode.EndArray) {
      if (
        opcode === Opcode.EndArray && (options.offset - 1) !== currentOffset
      ) {
        result.push(value);
      }
      break;
    }

    result.push(value);
  }
  options.offset++;

  return result;
}
