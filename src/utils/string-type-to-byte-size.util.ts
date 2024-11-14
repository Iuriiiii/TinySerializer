import { StringType } from "../enums/mod.ts";

export function stringTypeToByteSize(type: StringType) {
  switch (type) {
    case StringType.Small:
      return 1;
    case StringType.Medium:
      return 2;
    case StringType.Large:
      return 4;
  }
}
