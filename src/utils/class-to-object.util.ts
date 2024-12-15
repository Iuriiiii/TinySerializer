// deno-lint-ignore-file no-explicit-any
import type { SerializableClass } from "../abstractions/mod.ts";
import type { SerializedClass } from "../interfaces/mod.ts";

export function classToObject(clazz: SerializableClass) {
  if (clazz.serialize) {
    return clazz.serialize();
  }

  const members: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(clazz)) {
    if (value instanceof Function) {
      continue;
    }

    members[key] = value;
  }

  return { members, arguments: [] } satisfies SerializedClass<any>;
}
