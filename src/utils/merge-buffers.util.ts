export function mergeBuffers(...buffers: Uint8Array[]): Uint8Array {
  let offset = 0;
  const result = new Uint8Array(
    buffers.reduce((acc, buff) => acc + buff.length, 0),
  );

  for (const buffer of buffers) {
    result.set(buffer, offset);
    offset += buffer.length;
  }

  return result;
}
