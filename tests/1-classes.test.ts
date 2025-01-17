import { assertEqual, test } from "@inspatial/test";
import { deserialize, Serializable, serialize } from "../mod.ts";
import { SerializableClass, type SerializedClass } from "../types.ts";
import type { RequireAtLeastOne } from "../src/types/mod.ts";

@Serializable()
class User extends SerializableClass {
  public isOld!: boolean;

  constructor(public readonly name: string, public readonly age: number) {
    super();
  }
}

@Serializable()
class User2 extends SerializableClass {
  public isOld!: boolean;

  constructor(public readonly name: string, public readonly age: number) {
    super();
  }

  public serialize(): RequireAtLeastOne<
    SerializedClass<typeof User2>
  > {
    return {
      members: {
        name: this.name,
        age: this.age,
        isOld: this.isOld ?? true,
      },
    };
  }
}

@Serializable()
class User3 extends SerializableClass {
  public isOld!: boolean;

  constructor(public readonly name: string, public readonly age: number) {
    super();
  }

  public serialize(): RequireAtLeastOne<
    SerializedClass<typeof User2>
  > {
    return {
      members: {
        name: this.name,
        age: this.age,
        isOld: this.isOld ?? true,
      },
    };
  }

  static override deserialize(
    serialized: SerializedClass<typeof User3>,
  ): User3 {
    const { members } = serialized;
    return new User3(members.name as string, members.age as number);
  }
}

test("Class Serialization", () => {
  const user = new User("John", 25);

  const serialization = serialize(user);
  const deserialization = deserialize<User>(serialization.value, {
    objectDatabase: serialization.objectDatabase,
    stringDatabase: serialization.stringDatabase,
  });

  assertEqual(deserialization.value instanceof User, true);
  assertEqual(deserialization.value.name, "John");
  assertEqual(deserialization.value.age, 25);
  assertEqual(deserialization.value.isOld, undefined);
});

test("Class Serialization 2", () => {
  const user = new User2("John", 25);

  const serialization = serialize(user);
  const deserialization = deserialize<User2>(serialization.value, {
    objectDatabase: serialization.objectDatabase,
    stringDatabase: serialization.stringDatabase,
  });

  assertEqual(deserialization.value instanceof User2, true);
  assertEqual(deserialization.value.name, "John");
  assertEqual(deserialization.value.age, 25);
  assertEqual(deserialization.value.isOld, true);
});

test("Class Serialization 3", () => {
  const user = new User3("John", 25);

  const serialization = serialize(user);
  const deserialization = deserialize<User3>(serialization.value, {
    objectDatabase: serialization.objectDatabase,
    stringDatabase: serialization.stringDatabase,
  });

  assertEqual(deserialization.value instanceof User3, true);
  assertEqual(deserialization.value.name, "John");
  assertEqual(deserialization.value.age, 25);
  assertEqual(deserialization.value.isOld, undefined);
});
