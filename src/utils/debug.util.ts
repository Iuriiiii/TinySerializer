import type { DeserializeOptions } from "../interfaces/mod.ts";
import { bufferArrayToString } from "./buffer-array-to-string.util.ts";

export function debug(
  name: string,
  serialized: Uint8Array,
  options: DeserializeOptions,
  ...args: unknown[]
) {
  console.log(`------------------${name}------------------`);
  console.log(bufferArrayToString(serialized, options.offset));
  console.log("offset:", options.offset, ...args);
}
