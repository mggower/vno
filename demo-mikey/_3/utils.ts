export async function prompt(msg: string = "") {
  const buf = new Uint8Array(1024);
  await Deno.stdout.write(new TextEncoder().encode(`${msg}: `));
  const n = <number> await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
}