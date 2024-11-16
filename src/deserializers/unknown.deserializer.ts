import type { DeserializeOptions } from "../interfaces/mod.ts";
import { isUndefined } from "@online/is";
import { Serialization } from "../enums/mod.ts";
import { booleanDeserializer } from "./boolean.deserializer.ts";
import { infinityDeserializer } from "./infinity.deserializer.ts";
import { nanDeserializer } from "./nan.deserializer.ts";
import { nullDeserializer } from "./null.deserializer.ts";
import { numberDeserializer } from "./number.deserializer.ts";
import { stringReferenceDeserializer } from "./string-reference.deserializer.ts";
import { stringDeserializer } from "./string.deserializer.ts";
import { undefinedDeserializer } from "./undefined.deserializer.ts";
import { unumberDeserializer } from "./unumber.deserializer.ts";
import { arrayDeserializer } from "./array.deserializer.ts";
import { objectDeserializer } from "./object.deserializer.ts";
import { referenceDeserializer } from "./reference.deserializer.ts";
import { classDeserializer } from "./class.deserializer.ts";

export function unknownDeserializer(
  serialized: Uint8Array,
  options: DeserializeOptions,
): unknown {
  const currentOpcode = serialized.at(options.offset);

  if (isUndefined(currentOpcode)) {
    return undefined;
  }

  switch (true) {
    case currentOpcode === Serialization.EndArray ||
      currentOpcode === Serialization.EndObject:
      return;
    case currentOpcode === Serialization.Array:
      return arrayDeserializer(serialized, options);
    case currentOpcode === Serialization.Object:
      return objectDeserializer(serialized, options);
    case currentOpcode === Serialization.StringReference ||
      currentOpcode === Serialization.Reserved3 ||
      currentOpcode === Serialization.Reserved4:
      return stringReferenceDeserializer(serialized, options);
    case currentOpcode === Serialization.String ||
      currentOpcode === Serialization.Reserved1 ||
      currentOpcode === Serialization.Reserved2:
      return stringDeserializer(serialized, options);
    case currentOpcode === Serialization.Reference:
      return referenceDeserializer(serialized, options);
    case currentOpcode === Serialization.Byte:
      return numberDeserializer(serialized, options, 1);
    case currentOpcode === Serialization.Word:
      return numberDeserializer(serialized, options, 2);
    case currentOpcode === Serialization.DWord:
      return numberDeserializer(serialized, options, 4);
    case currentOpcode === Serialization.UByte:
      return unumberDeserializer(serialized, options, 1);
    case currentOpcode === Serialization.UWord:
      return unumberDeserializer(serialized, options, 2);
    case currentOpcode === Serialization.UDWord:
      return unumberDeserializer(serialized, options, 4);
    case currentOpcode === Serialization.QWord:
      return numberDeserializer(serialized, options, 8);
    case currentOpcode === Serialization.True ||
      currentOpcode === Serialization.False:
      return booleanDeserializer(serialized, options);
    case currentOpcode === Serialization.Undefined:
      return undefinedDeserializer(options);
    case currentOpcode === Serialization.Null:
      return nullDeserializer(options);
    case currentOpcode === Serialization.Class:
      return classDeserializer(serialized, options);
    case currentOpcode === Serialization.Infinity ||
      currentOpcode === Serialization.NegativeInfinity:
      return infinityDeserializer(serialized, options);
    case currentOpcode === Serialization.NaN:
      return nanDeserializer(options);
    default:
      for (const deserializer of options.deserializers) {
        const result = deserializer(serialized, options);

        if (result) {
          return result;
        }
      }

      throw new Error(`Unknown opcode: ${currentOpcode}`);
  }
}
