// deno-lint-ignore-file
import type { SerializedClass } from "../interfaces/mod.ts";
import type { RequireAtLeastOne } from "../types/mod.ts";

export abstract class SerializableClass {
  public serialize?(): RequireAtLeastOne<SerializedClass<any>>;
  public static deserialize?(serialized: Partial<SerializedClass<any>>): any;
}
