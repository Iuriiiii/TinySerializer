import type { Constructor } from "../types/mod.ts";

export interface SerializedClass<T extends Constructor> {
  arguments: ConstructorParameters<T>;
  members: object;
}
