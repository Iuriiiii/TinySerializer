import { Database } from "./src/classes/mod.ts";
import { unknownDeserializer } from "./src/deserializers/unknown.deserializer.ts";
import { unknownSerializer } from "./src/serializers/mod.ts";

export function deserialize(serialized: Uint8Array): unknown {
    return JSON.parse(new TextDecoder().decode(serialized));
}

const stringDatabase = new Database<string>();
const objectDatabase = new Database<object | Array<unknown>>();
const buff = unknownSerializer((2**31)-0, {
    stringDatabase,
    objectDatabase,
});
// const databaseBuff = unknownSerializer(stringDatabase, {
//     stringDatabase: null as unknown as Database<string>,
//     objectDatabase,
// });

const deserializedBuff = unknownDeserializer(buff, {
    offset: 0,
    objectDatabase: new Database(),
    stringDatabase: new Database(),
});

console.log(buff, deserializedBuff);
