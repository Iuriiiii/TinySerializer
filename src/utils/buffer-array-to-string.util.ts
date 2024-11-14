export function bufferArrayToString(buffer: Uint8Array, highlight?: number) {
  return buffer.reduce((acc, value, index) => {
    if (index === highlight) {
      return acc.concat(`[${value}]`);
    }

    return acc.concat(`${value}`);
  }, [] as string[]).join(", ");
}
