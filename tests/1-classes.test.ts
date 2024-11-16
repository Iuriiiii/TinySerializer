import { assertEquals } from "@std/assert";
import { deserialize, Serializable, serialize } from "../mod.ts";
import { SerializableClass, type SerializedClass } from "../types.ts";

@Serializable()
class User extends SerializableClass {
  public isOld!: boolean;

  constructor(public readonly name: string, public readonly age: number) {
    super();
  }

  public override serialize(): SerializedClass<typeof User> {
    return {
      arguments: [this.name, this.age],
      members: {
        isOld: this.isOld ?? true,
      },
    };
  }
}

Deno.test("Class Serialization", async (t) => {
  await t.step("User", () => {
    const user = new User("John", 25);

    const serialization = serialize(user);
    const deserialization = deserialize<User>(serialization.value, {
      objectDatabase: serialization.objectDatabase,
      stringDatabase: serialization.stringDatabase,
    });

    assertEquals(deserialization.value.name, "John");
    assertEquals(deserialization.value.age, 25);
    assertEquals(deserialization.value.isOld, true);
  });
});
