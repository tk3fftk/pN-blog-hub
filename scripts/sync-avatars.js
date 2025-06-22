import fs from "fs/promises";
import path from "path";
import https from "https";
import http from "http";
import { members } from "../members.ts";

const AVATARS_DIR = "public/avatars";

async function downloadImage(url, filename) {
  const protocol = url.startsWith("https:") ? https : http;

  return new Promise((resolve, reject) => {
    const request = protocol.get(url, (response) => {
      // リダイレクト対応
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        return downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
        return;
      }

      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", async () => {
        try {
          await fs.writeFile(filename, Buffer.concat(chunks));
          console.log(`✓ Downloaded: ${path.basename(filename)}`);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });

    request.on("error", reject);
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error(`Timeout: ${url}`));
    });
  });
}

async function getImageExtension(url) {
  // URLから拡張子を推測
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath);

  if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext.toLowerCase())) {
    return ext.toLowerCase();
  }

  // 拡張子が不明な場合、Content-Typeから推測
  const protocol = url.startsWith("https:") ? https : http;

  return new Promise((resolve) => {
    const request = protocol.request(url, { method: "HEAD" }, (response) => {
      const contentType = response.headers["content-type"];
      if (contentType?.includes("image/jpeg")) resolve(".jpg");
      else if (contentType?.includes("image/png")) resolve(".png");
      else if (contentType?.includes("image/gif")) resolve(".gif");
      else if (contentType?.includes("image/webp")) resolve(".webp");
      else resolve(".jpg"); // デフォルト
    });

    request.on("error", () => resolve(".jpg"));
    request.setTimeout(5000, () => {
      request.destroy();
      resolve(".jpg");
    });
    request.end();
  });
}

async function syncAvatars() {
  // avatarsディレクトリ作成
  await fs.mkdir(AVATARS_DIR, { recursive: true });

  for (const member of members) {
    const { id, avatarSrc } = member;

    // 既にローカルファイルの場合はスキップ
    if (!avatarSrc.startsWith("http")) {
      console.log(`- Skipped (local): ${id}`);
      continue;
    }

    // 既存ファイルの確認
    const existingFiles = await fs.readdir(AVATARS_DIR).catch(() => []);
    const existingFile = existingFiles.find((file) =>
      file.startsWith(`${id}.`)
    );

    if (existingFile) {
      console.log(`- Skipped (exists): ${id}`);
      continue;
    }

    try {
      const ext = await getImageExtension(avatarSrc);
      const filename = path.join(AVATARS_DIR, `${id}${ext}`);

      await downloadImage(avatarSrc, filename);
    } catch (error) {
      console.error(`✗ Failed to download ${id}: ${error.message}`);
    }
  }
}

syncAvatars().catch(console.error);
