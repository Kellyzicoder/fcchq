/**
 * One-off: swap the live CMS media over to the optimised files in /public
 * without wiping any content (unlike seed.ts).
 *
 *   - every JPG/PNG in the media library that has a matching .webp in /public
 *     is re-uploaded as that WebP (same media doc, so every reference keeps working)
 *   - the hero/"Jesus March" video is replaced with the compressed MP4
 *   - the "Baptism" video entry is removed, leaving a single video
 *
 * Run once with the production env vars loaded (DATABASE_URI, PAYLOAD_SECRET,
 * BLOB_READ_WRITE_TOKEN):
 *
 *   npm run optimize:media
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "../payload.config.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../public");

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

// Payload de-duplicates filenames as "name-1.jpg", so strip that suffix too.
const stemOf = (filename: string) =>
  path.basename(filename, path.extname(filename)).replace(/-\d+$/, "");

async function main() {
  const payload = await getPayload({ config });

  const replacements = new Map<string, { file: string; mimetype: string }>();
  for (const file of walk(publicDir)) {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".webp" && !file.includes("poster")) {
      replacements.set(stemOf(file), { file, mimetype: "image/webp" });
    }
    if (ext === ".mp4") replacements.set(stemOf(file), { file, mimetype: "video/mp4" });
  }

  // 1. Drop the Baptism video entry (and its file if nothing else uses it).
  const { docs: videos } = await payload.find({ collection: "videos", depth: 0, limit: 100 });
  const baptismMediaIds = new Set<string>();
  for (const video of videos) {
    if (video.name.toLowerCase().includes("baptism")) {
      if (typeof video.file === "string") baptismMediaIds.add(video.file);
      await payload.delete({ collection: "videos", id: video.id });
      console.log(`Removed video entry "${video.name}"`);
    }
  }
  const settings = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  for (const id of baptismMediaIds) {
    if (settings.heroVideo === id) continue;
    await payload.delete({ collection: "media", id });
    console.log(`Removed media ${id}`);
  }

  // 2. Re-upload every remaining media file that has an optimised version.
  const { docs: media } = await payload.find({ collection: "media", depth: 0, limit: 1000 });
  for (const doc of media) {
    if (!doc.filename) continue;
    const match = replacements.get(stemOf(doc.filename));
    if (!match) {
      console.log(`Skipped ${doc.filename} (no optimised version in /public)`);
      continue;
    }
    if (doc.mimeType === match.mimetype && doc.filesize === fs.statSync(match.file).size) {
      console.log(`Already optimised: ${doc.filename}`);
      continue;
    }
    const data = fs.readFileSync(match.file);
    await payload.update({
      collection: "media",
      id: doc.id,
      data: {},
      file: {
        data,
        mimetype: match.mimetype,
        name: path.basename(match.file),
        size: data.length,
      },
    });
    const before = doc.filesize ? `${Math.round(doc.filesize / 1024)}KB` : "?";
    console.log(`Replaced ${doc.filename} (${before}) -> ${path.basename(match.file)} (${Math.round(data.length / 1024)}KB)`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
