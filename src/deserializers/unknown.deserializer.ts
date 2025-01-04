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

  let result;

  switch (true) {
    case currentOpcode === Opcode.EndArray ||
      currentOpcode === Opcode.EndObject:
      return;
    case currentOpcode === Opcode.Array:
      result = arrayDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.Object:
      result = objectDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.StringReference ||
      currentOpcode === Opcode.Reserved3 ||
      currentOpcode === Opcode.Reserved4:
      result = stringReferenceDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.String ||
      currentOpcode === Opcode.Reserved1 ||
      currentOpcode === Opcode.Reserved2:
      result = stringDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.Reference:
      result = referenceDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.Number:
    case currentOpcode === Opcode.SignedNumber:
      result = numberDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.True ||
      currentOpcode === Opcode.False:
      result = booleanDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.Undefined:
      result = undefinedDeserializer(options);
      break;
    case currentOpcode === Opcode.Null:
      result = nullDeserializer(options);
      break;
    case currentOpcode === Opcode.Class:
      result = classDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.Infinity ||
      currentOpcode === Opcode.NegativeInfinity:
      result = infinityDeserializer(serialized, options);
      break;
    case currentOpcode === Opcode.NaN:
      result = nanDeserializer(options);
      break;
    default:
      for (const deserializer of options.deserializers) {
        const _result = deserializer(serialized, options);

        if (_result) {
          return !options.decoder ? _result : options.decoder(_result);
        }
      }

      throw new Error(`Unknown opcode: ${currentOpcode}`);
  }

  return !options.decoder ? result : options.decoder(result);
}
