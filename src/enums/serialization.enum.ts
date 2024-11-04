export enum Serialization {
    Byte = 0,
    Word,
    DWord,
    QWord,
    BigInt,
    Infinity,
    NegativeInfinity,
    NaN,
    True,
    False,
    Regex,
    Undefined,
    Null,
    Object,
    EndObject,
    Array,
    EndArray,
    Reference,
    /**
     * Member, String ID, Type
     */
    Member,
    String,
    // I have to say that you musn't remove this?
    Reserved1,
    Reserved2,
    StringReference,
    Reserved3,
    Reserved4,
}
