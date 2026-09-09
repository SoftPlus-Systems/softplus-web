/**
 * Turns every raster image in source-images/ into a WebP inside public/,
 * mirroring the folder structure. Runs automatically before `dev` and
 * `build`, so dropping a PNG or JPG into source-images/ is all it takes to
 * get an optimised asset — nothing in the app ever references the original.
 *
 * Conversions are skipped when the output is already newer than its source,
 * which keeps repeat builds close to free.
 */
import { constants } from "node:fs";
import { access, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(root, "source-images");
const OUTPUT_DIR = path.join(root, "public");

// Screenshots ship at 2x their largest on-page size; next/image scales down
// from here per breakpoint, so anything wider is bytes nobody downloads.
const MAX_WIDTH = 1600;
const QUALITY = 80;

const RASTER = new Set([".png", ".jpg", ".jpeg", ".tif", ".tiff", ".webp"]);

async function exists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

function format(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

async function main() {
  if (!(await exists(SOURCE_DIR))) {
    console.log("[images] no source-images/ directory — nothing to do");
    return;
  }

  let converted = 0;
  let skipped = 0;
  let sourceBytes = 0;
  let outputBytes = 0;

  for await (const source of walk(SOURCE_DIR)) {
    if (!RASTER.has(path.extname(source).toLowerCase())) continue;

    const relative = path.relative(SOURCE_DIR, source);
    const target = path.join(OUTPUT_DIR, relative.replace(/\.[^.]+$/, ".webp"));
    const sourceStat = await stat(source);

    if (await exists(target)) {
      const targetStat = await stat(target);
      if (targetStat.mtimeMs >= sourceStat.mtimeMs) {
        skipped += 1;
        sourceBytes += sourceStat.size;
        outputBytes += targetStat.size;
        continue;
      }
    }

    await mkdir(path.dirname(target), { recursive: true });
    await sharp(source)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(target);

    const targetStat = await stat(target);
    converted += 1;
    sourceBytes += sourceStat.size;
    outputBytes += targetStat.size;

    const saved = Math.round((1 - targetStat.size / sourceStat.size) * 100);
    console.log(
      `[images] ${relative} → ${path.relative(root, target)}  ` +
        `${format(sourceStat.size)} → ${format(targetStat.size)} (-${saved}%)`
    );
  }

  console.log(
    `[images] ${converted} converted, ${skipped} up to date — ` +
      `${format(sourceBytes)} of sources served as ${format(outputBytes)} of WebP`
  );
}

main().catch((error) => {
  console.error("[images] conversion failed:", error);
  process.exitCode = 1;
});
