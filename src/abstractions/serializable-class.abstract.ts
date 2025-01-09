// deno-lint-ignore-file
import type { SerializedClass } from "../interfaces/mod.ts";

export abstract class SerializableClass {
  public static deserialize?(serialized: Partial<SerializedClass<any>>): any;
}
