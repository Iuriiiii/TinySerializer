import { Row } from "../interfaces/row.interface.ts";

export class Database<T> {
    public readonly rows = new Map<T, number>();
    private id = 0;

    public get(id: number) {
        for (const [value, rowId] of this.rows) {
            if (rowId === id) {
                return value;
            }
        }

        return undefined;
    }

    public getOrInsert(value: T) {
        if (!this.rows.has(value)) {
            this.rows.set(value, this.id++);
        }

        return this.rows.get(value)!;
    }

    public has(value: T) {
        return this.rows.has(value);
    }

    public toArrayOfObjects() {
        const result: Row<T>[] = [];

        for (const [value, id] of this.rows) {
            result.push({ id, value });
        }

        return result.sort((a, b) => a.id - b.id);
    }
}
