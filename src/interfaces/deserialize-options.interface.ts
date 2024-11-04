import { SerializeOptions } from "./serialize-options.interface.ts";

export interface DeserializeOptions extends SerializeOptions {
    offset: number;
}
