import { Serialization } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";
import { memberDeserializer } from "./member.deserializer.ts";

export function objectDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): object {
  const result = {};

  options.objectDatabase.getOrInsert(result);
  options.offset++;
  while (true) {
    const opcode = serialized.at(options.offset);

    if (
      opcode === Serialization.EndObject ||
      opcode === Serialization.EndArray ||
      opcode === undefined
    ) {
      options.offset++;
      break;
    }

    memberDeserializer(serialized, options, result);
  }

  return result;
}
