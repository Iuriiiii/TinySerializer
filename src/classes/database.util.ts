import type { Row } from "../interfaces/row.interface.ts";

export class Database<T> {
  public readonly rows: Map<T, number> = new Map<T, number>();
  private id = 0;

  public get(id: number): T | undefined {
    for (const [value, rowId] of this.rows) {
      if (rowId === id) {
        return value;
      }
    }

    return undefined;
  }

  public getOrInsert(value: T): number {
    if (!this.rows.has(value)) {
      this.rows.set(value, this.id++);
    }

    return this.rows.get(value)!;
  }

  public has(value: T): boolean {
    return this.rows.has(value);
  }

  public toArrayOfObjects(): Row<T>[] {
    const result: Row<T>[] = [];

    for (const [value, id] of this.rows) {
      result.push({ id, value });
    }

    return result.sort((a, b) => a.id - b.id);
  }
}
