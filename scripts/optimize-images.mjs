import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../public/images");
const output = resolve(root, "optimized");
const photos = [
  ["Pasted image.png", "anticor", 1215],
  ["Pasted image (2).png", "suspension", 533],
  ["Pasted image (3).png", "underbody", 533],
  ["Pasted image (4).png", "preparation", 500],
  ["Pasted image (5).png", "polishing", 1600],
  ["Pasted image (6).png", "headlights-before-after", 960],
  ["Pasted image (7).png", "body-before-after", 800],
  ["полировка.png", "polishing-result", 1600],
  ["полировка-фар.png", "headlights-polishing", 1600],
  ["Pasted image (8).png", "soundproofing", 1000],
];

await mkdir(output, { recursive: true });
for (const [input, name, width] of photos) {
  const info = await sharp(resolve(root, input))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(resolve(output, `${name}.webp`));
  console.log(`${name}: ${info.width} × ${info.height}, ${info.size} bytes`);
}
