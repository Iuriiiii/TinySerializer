import type { SerializeOptions } from "../interfaces/mod.ts";
import { Database } from "../classes/mod.ts";
import {
  isArray,
  isBoolean,
  isInfinity,
  isNaN,
  isNull,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
} from "@online/is";
import { numberSerializer } from "./number.serializer.ts";
import { stringSerializer } from "./string.serializer.ts";
import { booleanSerializer } from "./boolean.serializer.ts";
import { undefinedSerializer } from "./undefined.serializer.ts";
import { nullSerializer } from "./null.serializer.ts";
import { infinitySerializer } from "./infinity.serializer.ts";
import { nanSerializer } from "./nan.serializer.ts";
import { databaseSerializer } from "./database.serializer.ts";
import { referenceSerializer } from "./reference.serializer.ts";
import { stringReferenceSerializer } from "./string-reference.serializer.ts";
import { isSerializableClass } from "../validators/mod.ts";
import { classSerializer } from "./class.serializer.ts";

/**
 * Serializes an unknown value into a Uint8Array using various serializers
 * based on the type of the value.
 *
 * @param value - The value to serialize, which can be of any type.
 * @param options - Options for serialization, including custom encoders
 *                  and a list of serializers.
 * @returns A Uint8Array representing the serialized form of the input value.
 *
 * The function attempts to serialize the value using a series of checks to
 * determine its type, such as number, string, boolean, array, object, etc.
 * If a custom encoder is provided in the options, it is used to transform the
 * value before serialization. If the value matches none of the predefined
 * types or the custom serializers, an error is thrown.
 */
export function unknownSerializer(
  value: unknown,
  options: SerializeOptions,
): Uint8Array {
  const serializableValue = options?.encoder ? options.encoder(value) : value;

  switch (true) {
    case isNumber(serializableValue) && !isNaN(serializableValue) &&
      !isInfinity(serializableValue):
      return numberSerializer(serializableValue, options);
    case isString(serializableValue):
      if (!options.plainText) {
        return stringReferenceSerializer(serializableValue, options);
      }

      return stringSerializer(serializableValue, options);
    case isBoolean(serializableValue):
      return booleanSerializer(serializableValue);
    case isArray(serializableValue) || isPlainObject(serializableValue):
      // Try to resolve the reference, otherwise serialize the object
      return referenceSerializer(serializableValue, options);
    case isUndefined(serializableValue):
      return undefinedSerializer();
    case isNull(serializableValue):
      return nullSerializer();
    case isInfinity(serializableValue):
      return infinitySerializer(serializableValue < 0);
    case isNaN(serializableValue):
      return nanSerializer();
    case isSerializableClass(serializableValue):
      return classSerializer(serializableValue, options);
    case serializableValue instanceof Database:
      return databaseSerializer(serializableValue, options);
    default:
      for (const serializer of options.serializers) {
        const result = serializer(serializableValue, options);

        if (result) {
          return result;
        }
      }

      console.warn(
        "Is the serializable value a class? Remember to use the Serializable decorator!.",
      );
      throw new Error("Non serializable value found", {
        cause: serializableValue,
      });
  }
}
