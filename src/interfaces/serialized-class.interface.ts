import type { Constructor, PickMembers } from "../types/mod.ts";

/**
 * Represents a serialized class.
 */
export interface SerializedClass<T extends Constructor> {
  /**
   * The arguments of the class.
   */
  arguments: ConstructorParameters<T>;

  /**
   * The members of the class.
   */
  members: Partial<PickMembers<InstanceType<T>>>;
}
