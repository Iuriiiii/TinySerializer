import { NumberSerializationType } from "../enums/mod.ts";
import {
  isByte,
  isDword,
  isQword,
  isUbyte,
  isUdword,
  isUword,
  isWord,
} from "../validators/mod.ts";
import { byteSerializer } from "./byte.serializer.ts";
import { dwordSerializer } from "./dword.serializer.ts";
import { qwordSerializer } from "./qword.serializer.ts";
import { wordSerializer } from "./word.serializer.ts";

export function numberSerializer(
  value: number,
  type = NumberSerializationType.Auto,
): Uint8Array {
  const isSignedByte = isByte(value);
  const isSignedWord = !isSignedByte && isWord(value);
  const isSignedDword = !isSignedByte && !isSignedWord && isDword(value);

  switch (true) {
    case isUbyte(value):
    case isSignedByte:
      return byteSerializer(
        value,
        type === NumberSerializationType.Auto ? isSignedByte : Boolean(type),
      );
    case isUword(value):
    case isSignedWord:
      return wordSerializer(
        value,
        type === NumberSerializationType.Auto ? isSignedWord : Boolean(type),
      );
    case isUdword(value):
    case isSignedDword:
      return dwordSerializer(
        value,
        type === NumberSerializationType.Auto ? isSignedDword : Boolean(type),
      );
    case isQword(value):
      return qwordSerializer(value);
    default:
      throw new Error("Invalid number");
  }
}
