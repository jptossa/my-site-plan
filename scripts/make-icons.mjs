// Generates the raster favicons from src/app/icon.svg (Gus). Run: node scripts/make-icons.mjs
// Outputs: src/app/apple-icon.png, src/app/favicon.ico, public/icon-192.png, public/icon-512.png
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile(new URL("../src/app/icon.svg", import.meta.url));
const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

await writeFile(new URL("../src/app/apple-icon.png", import.meta.url), await png(180));
await writeFile(new URL("../public/icon-192.png", import.meta.url), await png(192));
await writeFile(new URL("../public/icon-512.png", import.meta.url), await png(512));

// .ico container holding PNG images at 16, 32 and 48 px.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0);
  e.writeUInt8(sizes[i], 1);
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  return e;
});
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), Buffer.concat([header, ...entries, ...images]));
console.log("icons written");
