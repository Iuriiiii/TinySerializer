import { StringType } from "../enums/mod.ts";

export function getStringType(value: string): StringType {
  if (value.length < 256) {
    return StringType.Small;
  } else if (value.length < 65536) {
    return StringType.Medium;
  } else {
    return StringType.Large;
  }
}
