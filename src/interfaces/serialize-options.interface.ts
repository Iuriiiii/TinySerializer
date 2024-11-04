import { Database } from "../classes/mod.ts";

export interface SerializeOptions {
    objectDatabase: Database<object>;
    stringDatabase: Database<string>;
}
