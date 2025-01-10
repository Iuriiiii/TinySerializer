// deno-lint-ignore-file no-explicit-any
import type { DecoderValueType } from "../enums/mod.ts";
import type { Constructor } from "./mod.ts";

/**
 * The decoder context
 */
interface IDecoderContext {
  /**
   * The context type
   */
  type: DecoderValueType;

  /**
   * Context, the object if the `type` is `DecoderValueType.Member`,
   * otherwise `undefined`
   */
  context: any;

  /**
   * The constructor if the `type` is `DecoderValueType.Class`,
   * otherwise `undefined`
   */
  constructor: Constructor;

  /**
   * The member name if the `type` is `DecoderValueType.Member`,
   * otherwise `undefined`
   */
  member: string;
}

/**
 * The decoder context, its structure depends on the `type` value
 */
export type DecoderContext<T extends DecoderValueType> = T extends
  DecoderValueType.Plain ? Pick<IDecoderContext, "type">
  : T extends DecoderValueType.Object ? Pick<IDecoderContext, "type">
  : T extends DecoderValueType.Class
    ? Pick<IDecoderContext, "type" | "constructor">
  : IDecoderContext;

/**
 * Decoder function called whenever a value is deserialized.
 * 
 * @param value - The deserialized value
 * @param context - The decoder context
 */
export type Decoder<T extends DecoderValueType = any> = (
  value: any,
  context: DecoderContext<T>,
) => any;
