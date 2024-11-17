import { Opcode } from "../enums/mod.ts";
import { numberToBytes } from "./number-to-bytes.util.ts";

// Thanks ChatGPT.
export function numberToBuffer(
  type:
    | Opcode.Byte
    | Opcode.Word
    | Opcode.DWord
    | Opcode.QWord
    | Opcode.UByte
    | Opcode.UWord
    | Opcode.UDWord,
  value: number,
) {
  const size = (() => {
    switch (type) {
      case Opcode.Byte:
      case Opcode.UByte:
        return 1;
      case Opcode.Word:
      case Opcode.UWord:
        return 2;
      case Opcode.UDWord:
      case Opcode.DWord:
        return 4;
      case Opcode.QWord:
        return 8;
    }
  })();
  const bytes = [type, ...numberToBytes(value, size)];

  return new Uint8Array(bytes);
}
