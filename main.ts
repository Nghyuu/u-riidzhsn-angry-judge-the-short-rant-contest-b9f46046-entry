import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rant = "The restaurant QR-code menu. I scan it, it opens a PDF, and the PDF won't load on the restaurant's own Wi-Fi. The waiter watches me squint at a spinning wheel like I'm the one who broke lunch. Then it finally loads — in Italian. I came in hungry. I left hungry, holding a dead phone and a menu I never read.";

// The gate requires 1-400 characters of non-whitespace UTF-8 text.
if (rant.length < 1 || rant.length > 400 || rant.trim().length === 0) {
  throw new Error(`rant length ${rant.length} is outside the 1-400 character gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "output");
fs.mkdirSync(outDir, { recursive: true });
const entryPath = path.join(outDir, "entry.txt");
fs.writeFileSync(entryPath, rant, "utf8");
fs.chmodSync(entryPath, 0o644);
