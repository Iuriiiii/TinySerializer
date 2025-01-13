import type { DeserializeOptions } from "../interfaces/mod.ts";
import type { Constructor } from "../types/mod.ts";
import { DecoderValueType, Opcode } from "../enums/mod.ts";
import { memberDeserializer } from "./member.deserializer.ts";

/**
 * Deserializes an object from a serialized Uint8Array buffer.
 *
 * @param serialized - The buffer containing the serialized object data.
 * @param options - Options to control the deserialization process.
 * @param clazz - If the object is a class instance, the class constructor.
 * @returns The deserialized object.
 *
 * The function first increments the offset, extracts the object members using
 * `memberDeserializer`, and populates the result object with the deserialized
 * members.
 *
 * If the `options.decoder` function is provided, it is called with the result
 * object and the `DecoderValueType.Object` type.
 * If the object is a class instance, the `options.decoder` function is called
 * with the result object and the `DecoderValueType.Class` type.
 */
export function objectDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
  clazz?: Constructor,
): object {
  const result = {};

  options.offset++;
  options.objectDatabase.getOrInsert(result);

  while (true) {
    const opcode = serialized.at(options.offset);

    if (
      opcode === Opcode.EndObject ||
      opcode === Opcode.EndArray ||
      opcode === undefined
    ) {
      options.offset++;
      break;
    }

    memberDeserializer(serialized, options, result);
  }

  return result;
}
