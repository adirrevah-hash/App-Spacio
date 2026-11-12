import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOADS_ROOT = path.join(process.cwd(), "public", "uploads");

function sanitizeExt(filename: string, fallback: string) {
  const ext = path.extname(filename).toLowerCase().replace(/[^a-z0-9.]/g, "");
  return ext || fallback;
}

/** Saves an uploaded File into public/uploads/<kind>/ and returns its public path. */
export async function saveUploadedFile(
  file: File,
  kind: "images" | "models",
  fallbackExt: string
) {
  const dir = path.join(UPLOADS_ROOT, kind);
  await mkdir(dir, { recursive: true });

  const ext = sanitizeExt(file.name, fallbackExt);
  const filename = `${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${kind}/${filename}`;
}

export function isUsableFile(file: FormDataEntryValue | null): file is File {
  return !!file && file instanceof File && file.size > 0;
}
