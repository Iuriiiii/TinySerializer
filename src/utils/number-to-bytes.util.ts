// Thanks ChatGPT.
export function numberToBytes(value: number, size: number) {
  const bytes: number[] = [];
  for (let i = 0; i < size; i++) {
    bytes.push((value >> (i * 8)) & 0xFF);
  }

  return bytes;
}
