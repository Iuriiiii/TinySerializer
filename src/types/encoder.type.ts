// deno-lint-ignore-file no-explicit-any
/**
 * Encoder function called before whenever a value is serialized.
 * 
 * @param value - The value to encode
 * @returns The encoded value
 */
export type Encoder = (value: any) => any;
