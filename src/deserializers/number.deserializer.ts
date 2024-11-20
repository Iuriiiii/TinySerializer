import type { DeserializeOptions } from "../interfaces/mod.ts";
import { byteDeserializer } from "./byte.deserializer.ts";
import { wordDeserializer } from "./word.deserializer.ts";
import { dwordDeserializer } from "./dword.deserializer.ts";
import { qwordDeserializer } from "./qword.deserializer.ts";
import { Opcode } from "../enums/mod.ts";
import { ubyteDeserializer } from "./ubyte.deserializer.ts";
import { uwordDeserializer } from "./uword.deserializer.ts";
import { udwordDeserializer } from "./udword.deserializer.ts";

export function numberDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): number {
  const currentOpcode = serialized.at(options.offset)!;

  switch (true) {
    case currentOpcode === Opcode.Byte:
      return byteDeserializer(serialized, options);
    case currentOpcode === Opcode.Word:
      return wordDeserializer(serialized, options);
    case currentOpcode === Opcode.DWord:
      return dwordDeserializer(serialized, options);
    case currentOpcode === Opcode.QWord:
      return qwordDeserializer(serialized, options);
    case currentOpcode === Opcode.UByte:
      return ubyteDeserializer(serialized, options);
    case currentOpcode === Opcode.UWord:
      return uwordDeserializer(serialized, options);
    case currentOpcode === Opcode.UDWord:
      return udwordDeserializer(serialized, options);
    default:
      return 0 as never;
  }
}
