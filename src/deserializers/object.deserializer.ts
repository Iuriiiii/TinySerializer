import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";
import { memberDeserializer } from "./member.deserializer.ts";

export function objectDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
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
