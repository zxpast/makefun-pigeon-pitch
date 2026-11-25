// The pigeon pitch.
//
// One line: the elevator pitch a city pigeon gives investors for its
// startup. The joke is assembled from three fixed parts — the pitch, the
// boast, and the confession — so the program is deterministic: same bytes
// every run, no clock, no randomness, no network, no external files.
//
// The laugh, for anyone who has watched a city pigeon work: the startup
// promises same-day delivery with no vans, no apps, no tracking — and the
// twist, in the last words, is that the delivery never arrives, because
// the pigeon kept the goods. Since Tuesday, your wedding ring has been
// sitting in its nest on Fifth Avenue. The pitch confesses the crime
// mid-pitch: the founder is the thief, and the "delivery network" is one
// bird with a hoarding problem. Naming the startup PeckPost (peck + post)
// makes the pitch concrete and pigeon-voiced instead of a generic "we".
import * as fs from "node:fs";
import * as path from "node:path";

// Fixed parts of the pitch. Nothing here varies between runs.
const ADDRESS = "Investors, PeckPost does same-day delivery";
const BOAST = "no vans, no apps, no tracking: just me";
const CONFESSION =
  "and since Tuesday, your wedding ring's been in my nest on Fifth Avenue.";

const PITCH = `${ADDRESS} — ${BOAST}, ${CONFESSION}`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// counted as Unicode code points, and not only white space.
const codePoints = [...PITCH].length;
if (codePoints < 1 || codePoints > 200 || PITCH.trim().length === 0) {
  throw new Error(`pitch is ${codePoints} code points, outside the 1-200 gate`);
}
if (PITCH.includes("\n")) {
  throw new Error("pitch must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), PITCH, "utf8");

console.log(PITCH);
console.log(`(${codePoints} code points, ${Buffer.byteLength(PITCH, "utf8")} bytes)`);
