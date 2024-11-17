import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";
import { ubyteDeserializer } from "./ubyte.deserializer.ts";
import { udwordDeserializer } from "./udword.deserializer.ts";
import { uwordDeserializer } from "./uword.deserializer.ts";

export function unumberDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
  size?: number,
): number {
  const currentOpcode = serialized.at(options.offset)!;
  const bytes = size ?? (() => {
    switch (true) {
      case currentOpcode === Opcode.UByte:
        return 1;
      case currentOpcode === Opcode.UWord:
        return 2;
      case currentOpcode === Opcode.UDWord:
        return 4;
      default:
        return 0;
    }
  })();

  switch (true) {
    case bytes === 1:
      return ubyteDeserializer(serialized, options);
    case bytes === 2:
      return uwordDeserializer(serialized, options);
    case bytes === 4:
      return udwordDeserializer(serialized, options);
    default:
      throw new Error("Invalid number size");
  }
}
