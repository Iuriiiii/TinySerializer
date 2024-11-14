import type { DeserializeOptions } from "../interfaces/mod.ts";
import { ubyteDeserializer } from "./ubyte.deserializer.ts";
import { udwordDeserializer } from "./udword.deserializer.ts";
import { uwordDeserializer } from "./uword.deserializer.ts";

export function unumberDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
  /**
   * Bytes to read.
   */
  bytes: number,
): number {
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
