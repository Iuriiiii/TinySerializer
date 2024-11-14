import type { DeserializeFunction } from "../types/mod.ts";
import type { SerializeOptions } from "./serialize-options.interface.ts";

export interface DeserializeOptions
  extends Omit<SerializeOptions, "plainText" | "serializers"> {
  offset: number;
  deserializers: DeserializeFunction[];
}
