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

async function migrateAllAvatars() {
  console.log("Starting migration of all avatar images...\n");

  await fs.mkdir(AVATARS_DIR, { recursive: true });

  const results = {
    downloaded: [],
    skipped: [],
    failed: [],
  };

  for (const member of members) {
    const { id, name, avatarSrc } = member;

    if (!avatarSrc.startsWith("http")) {
      results.skipped.push({ id, name, reason: "Already local" });
      continue;
    }

    try {
      const ext = await getImageExtension(avatarSrc);
      const filename = path.join(AVATARS_DIR, `${id}${ext}`);

      // 既存ファイルチェック
      try {
        await fs.access(filename);
        results.skipped.push({ id, name, reason: "File exists" });
        continue;
      } catch {
        // ファイルが存在しない場合は続行
      }

      await downloadImage(avatarSrc, filename);
      results.downloaded.push({ id, name, filename: `${id}${ext}` });
    } catch (error) {
      results.failed.push({ id, name, error: error.message });
    }
  }

  // 結果レポート
  console.log("\n=== Migration Results ===");
  console.log(`Downloaded: ${results.downloaded.length}`);
  console.log(`Skipped: ${results.skipped.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.downloaded.length > 0) {
    console.log("\n--- Downloaded ---");
    results.downloaded.forEach(({ id, filename }) =>
      console.log(`✓ ${id} -> ${filename}`)
    );
  }

  if (results.failed.length > 0) {
    console.log("\n--- Failed ---");
    results.failed.forEach(({ id, error }) => console.log(`✗ ${id}: ${error}`));
  }

  console.log("\n--- Next Steps ---");
  console.log("1. Review downloaded images in public/avatars/");
  console.log("2. Update members.ts to use local paths:");
  console.log('   avatarSrc: "/avatars/member-id.jpg"');
  console.log("3. Commit changes to repository");
}

migrateAllAvatars().catch(console.error);
