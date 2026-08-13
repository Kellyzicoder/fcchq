import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";

import { Media } from "./collections/Media";
import { Events } from "./collections/Events";
import { Announcements } from "./collections/Announcements";
import { Videos } from "./collections/Videos";
import { Resources } from "./collections/Resources";
import { SiteSettings } from "./globals/SiteSettings";
import { About } from "./globals/About";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
  },
  editor: lexicalEditor(),
  collections: [
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [],
    },
    Media,
    Events,
    Announcements,
    Videos,
    Resources,
  ],
  globals: [SiteSettings, About],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
