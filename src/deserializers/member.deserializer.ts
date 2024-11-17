import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";
import { stringReferenceDeserializer } from "./string-reference.deserializer.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

export function memberDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
  result: object,
): object {
  options.offset++;
  if (serialized.at(options.offset) === Opcode.EndObject) {
    return result;
  }

  const member = stringReferenceDeserializer(serialized, options);
  const value = unknownDeserializer(serialized, options);

  // @ts-ignore: Index access
  result[member] = value;

  return result;
}
