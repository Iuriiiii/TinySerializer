import type { DeserializeOptions } from "../interfaces/mod.ts";
import { byteDeserializer } from "./byte.deserializer.ts";
import { wordDeserializer } from "./word.deserializer.ts";
import { dwordDeserializer } from "./dword.deserializer.ts";
import { qwordDeserializer } from "./qword.deserializer.ts";
import { Opcode } from "../enums/mod.ts";

export function numberDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  const currentOpcode = serialized.at(options.offset)!;
  const bytes = (() => {
    switch (true) {
      case currentOpcode === Opcode.Byte:
        return 1;
      case currentOpcode === Opcode.Word:
        return 2;
      case currentOpcode === Opcode.DWord:
        return 4;
      case currentOpcode === Opcode.QWord:
        return 8;
      default:
        return 0;
    }
  })();

  switch (true) {
    case bytes === 1:
      return byteDeserializer(serialized, options);
    case bytes === 2:
      return wordDeserializer(serialized, options);
    case bytes === 4:
      return dwordDeserializer(serialized, options);
    case bytes === 8:
      return qwordDeserializer(serialized, options);
    default:
      throw new Error("Invalid number size");
  }
}
