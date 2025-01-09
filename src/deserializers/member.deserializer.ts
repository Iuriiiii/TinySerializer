import type { DeserializeOptions } from "../interfaces/mod.ts";
import type { Constructor } from "../types/mod.ts";
import { DecoderValueType, Opcode } from "../enums/mod.ts";
import { stringReferenceDeserializer } from "./string-reference.deserializer.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

/**
 * Deserializes a member.
 *
 * @param serialized - The whole serialized array
 * @param options - The deserialize options
 * @param result - The object where the member will be added
 * @param clazz - The class of the object, if it is a class
 * @returns - Returns `result` with the member added.
 */
export function memberDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
  result: object,
  clazz?: Constructor,
): object {
  options.offset++;
  if (serialized.at(options.offset) === Opcode.EndObject) {
    return result;
  }

  const member = stringReferenceDeserializer(serialized, options);
  const value = unknownDeserializer(serialized, options);
  options.decoder?.(value, {
    type: DecoderValueType.Member,
    context: result,
    member,
    constructor: clazz,
  });

  // @ts-ignore: Index access
  result[member] = value;

  return result;
}
