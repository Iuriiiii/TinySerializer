import type { SerializedClass } from "../interfaces/mod.ts";

export abstract class SerializableClass {
  // deno-lint-ignore no-explicit-any
  public abstract serialize(): SerializedClass<any>;
}
