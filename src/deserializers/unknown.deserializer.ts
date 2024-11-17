import type { DeserializeOptions } from "../interfaces/mod.ts";
import { isUndefined } from "@online/is";
import { Opcode } from "../enums/mod.ts";
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
    case currentOpcode === Opcode.EndArray ||
      currentOpcode === Opcode.EndObject:
      return;
    case currentOpcode === Opcode.Array:
      return arrayDeserializer(serialized, options);
    case currentOpcode === Opcode.Object:
      return objectDeserializer(serialized, options);
    case currentOpcode === Opcode.StringReference ||
      currentOpcode === Opcode.Reserved3 ||
      currentOpcode === Opcode.Reserved4:
      return stringReferenceDeserializer(serialized, options);
    case currentOpcode === Opcode.String ||
      currentOpcode === Opcode.Reserved1 ||
      currentOpcode === Opcode.Reserved2:
      return stringDeserializer(serialized, options);
    case currentOpcode === Opcode.Reference:
      return referenceDeserializer(serialized, options);
    case currentOpcode === Opcode.Byte:
      return numberDeserializer(serialized, options, 1);
    case currentOpcode === Opcode.Word:
      return numberDeserializer(serialized, options, 2);
    case currentOpcode === Opcode.DWord:
      return numberDeserializer(serialized, options, 4);
    case currentOpcode === Opcode.UByte:
      return unumberDeserializer(serialized, options, 1);
    case currentOpcode === Opcode.UWord:
      return unumberDeserializer(serialized, options, 2);
    case currentOpcode === Opcode.UDWord:
      return unumberDeserializer(serialized, options, 4);
    case currentOpcode === Opcode.QWord:
      return numberDeserializer(serialized, options, 8);
    case currentOpcode === Opcode.True ||
      currentOpcode === Opcode.False:
      return booleanDeserializer(serialized, options);
    case currentOpcode === Opcode.Undefined:
      return undefinedDeserializer(options);
    case currentOpcode === Opcode.Null:
      return nullDeserializer(options);
    case currentOpcode === Opcode.Class:
      return classDeserializer(serialized, options);
    case currentOpcode === Opcode.Infinity ||
      currentOpcode === Opcode.NegativeInfinity:
      return infinityDeserializer(serialized, options);
    case currentOpcode === Opcode.NaN:
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
