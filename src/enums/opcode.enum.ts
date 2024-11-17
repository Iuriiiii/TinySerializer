export enum Opcode {
  Byte = 0,
  Word = 1,
  DWord = 2,
  QWord = 3,
  UByte = 4,
  UWord = 5,
  UDWord = 6,
  BigInt = 7,
  Infinity = 8,
  NegativeInfinity = 9,
  NaN = 10,
  True = 11,
  False = 12,
  Regex = 13,
  Undefined = 14,
  Null = 15,
  Object = 16,
  EndObject = 17,
  Array = 18,
  EndArray = 19,
  Reference = 20,
  /**
   * Member, String ID, Type
   */
  Member = 21,
  String = 22,
  // I have to say that you musn't remove this?
  Reserved1,
  Reserved2,
  StringReference = 25,
  Reserved3,
  Reserved4,
  Class = 28,
  EndClass = 29,
  Instance,
  EndInstance,
  Latest
}
