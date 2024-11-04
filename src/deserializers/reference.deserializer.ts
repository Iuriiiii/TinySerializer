import { isArray } from "@online/is";
import { SerializeOptions } from "../interfaces/mod.ts";
import { arraySerializer } from "./array.serializer.ts";
import { objectSerializer } from "./object.serializer.ts";
import { Serialization } from "../enums/mod.ts";

export function referenceSerializer(
    value: unknown[] | object,
    options: SerializeOptions,
) {
    const objectId = options.objectDatabase.rows.get(value);

    if (!objectId) {
        options.objectDatabase.getOrInsert(value);

        if (isArray(value)) {
            return arraySerializer(value, options);
        }

        return objectSerializer(value, options);
    }

    return new Uint8Array([Serialization.Reference, objectId]);
}
