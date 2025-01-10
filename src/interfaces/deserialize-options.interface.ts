import type { Decoder, DeserializeFunction } from "../types/mod.ts";
import type { SerializeOptions } from "./serialize-options.interface.ts";

/**
 * Options for deserializing
 */
export interface DeserializeOptions extends
  Omit<
    SerializeOptions,
    "plainText" | "serializers" | "plainObject" | "encoder"
  > {
  /**
   * The current offset of the serialized data.
   */
  offset: number;

  /**
   * All custom deserializers.
   */
  deserializers: DeserializeFunction[];

  /**
   * A decoder.
   */
  decoder?: Decoder;
}
