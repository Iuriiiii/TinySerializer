import type { Decoder, DeserializeFunction } from "../types/mod.ts";
import type { SerializeOptions } from "./serialize-options.interface.ts";

export interface DeserializeOptions extends
  Omit<
    SerializeOptions,
    "plainText" | "serializers" | "plainObject" | "encoder"
  > {
  offset: number;
  deserializers: DeserializeFunction[];
  decoder?: Decoder;
}
