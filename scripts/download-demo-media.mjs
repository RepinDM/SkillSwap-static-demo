import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(rootDirectory, "public", "db", "skillswap-data.json");
const mediaDirectory = path.join(rootDirectory, "public", "db", "media");
const legacyHost = "skillswap.ovnet.ru";

const collectUrls = (value, urls = new Set()) => {
  if (typeof value === "string" && value.startsWith("http://")) {
    urls.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectUrls(item, urls));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectUrls(item, urls));
  }

  return urls;
};

const getExtension = (url) => (new URL(url).pathname.endsWith(".png") ? ".png" : ".jpg");

const data = JSON.parse(await readFile(dataPath, "utf8"));
const urls = [...collectUrls(data)];
const localPaths = new Map();

await mkdir(mediaDirectory, { recursive: true });

for (const url of urls) {
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname !== legacyHost) {
    throw new Error(`Unexpected media host: ${parsedUrl.hostname}`);
  }

  const fileName = `${createHash("sha256").update(url).digest("hex").slice(0, 16)}${getExtension(url)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not download ${url}: ${response.status}`);
  }

  await writeFile(path.join(mediaDirectory, fileName), Buffer.from(await response.arrayBuffer()));
  localPaths.set(url, `db/media/${fileName}`);
}

const replaceUrls = (value) => {
  if (typeof value === "string") {
    return localPaths.get(value) ?? value;
  }

  if (Array.isArray(value)) {
    return value.map(replaceUrls);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceUrls(item)]));
  }

  return value;
};

await writeFile(dataPath, `${JSON.stringify(replaceUrls(data), null, 2)}\n`);
console.log(`Downloaded ${urls.length} media files to public/db/media.`);
