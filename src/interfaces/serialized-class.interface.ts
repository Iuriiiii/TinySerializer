import type { Constructor, PickMembers } from "../types/mod.ts";

export interface SerializedClass<T extends Constructor> {
  arguments: ConstructorParameters<T>;
  members: Partial<PickMembers<InstanceType<T>>>;
}
