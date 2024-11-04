import { isUndefined } from "@online/is";
import { Serialization } from "../enums/mod.ts";
import { DeserializeOptions } from "../interfaces/mod.ts";
import { booleanDeserializer } from "./boolean.deserializer.ts";
import { infinityDeserializer } from "./infinity.deserializer.ts";
import { nanDeserializer } from "./nan.deserializer.ts";
import { nullDeserializer } from "./null.deserializer.ts";
import { numberDeserializer } from "./number.deserializer.ts";
import { stringReferenceDeserializer } from "./string-reference.deserializer.ts";
import { stringDeserializer } from "./string.deserializer.ts";
import { undefinedDeserializer } from "./undefined.deserializer.ts";

export function unknownDeserializer(
    serialized: Uint8Array,
    options: DeserializeOptions,
): unknown {
    const currentOpcode = serialized.at(options.offset);
    console.log("src/deserializers/unknown.deserializer.ts:17->function", {
        currentOpcode,
    });
    if (isUndefined(currentOpcode)) {
        return undefined;
    }

    switch (true) {
        case currentOpcode === Serialization.StringReference ||
            currentOpcode === Serialization.Reserved3 ||
            currentOpcode === Serialization.Reserved4:
            return stringReferenceDeserializer(serialized, options);
        case currentOpcode === Serialization.String ||
            currentOpcode === Serialization.Reserved1 ||
            currentOpcode === Serialization.Reserved2:
            return stringDeserializer(serialized, options);
        case currentOpcode === Serialization.Byte:
            return numberDeserializer(serialized, options, 1);
        case currentOpcode === Serialization.Word:
            return numberDeserializer(serialized, options, 2);
        case currentOpcode === Serialization.DWord:
            return numberDeserializer(serialized, options, 4);
        case currentOpcode === Serialization.QWord:
            return numberDeserializer(serialized, options, 8);
        case currentOpcode === Serialization.True ||
            currentOpcode === Serialization.False:
            return booleanDeserializer(serialized, options);
        case currentOpcode === Serialization.Undefined:
            return undefinedDeserializer(options);
        case currentOpcode === Serialization.Null:
            return nullDeserializer(options);
        case currentOpcode === Serialization.Infinity ||
            currentOpcode === Serialization.NegativeInfinity:
            return infinityDeserializer(serialized, options);
        case currentOpcode === Serialization.NaN:
            return nanDeserializer(options);
    }

    return null;
}
