const fs = require("fs");
const path = require("path");

const root = process.cwd();
const targets = [".next", ".next-app", ".next-dev", ".next-turbo"];

for (const rel of targets) {
  const abs = path.join(root, rel);
  try {
    if (fs.existsSync(abs)) {
      fs.rmSync(abs, { recursive: true, force: true });
      console.log(`[clean-next-cache] removed ${rel}`);
    }
  } catch (error) {
    console.warn(`[clean-next-cache] could not remove ${rel}: ${error.message}`);
    console.warn("[clean-next-cache] close running Node/Next processes and retry.");
  }
}
