import child_process from "child_process";
import fs from "fs";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const commitHash = child_process
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

export default defineConfig({
  plugins: [
    react(),
    {
      name: "postbuild_commands",
      closeBundle: () => {
        const path = "./dist/manifest.json";
        const manifest = JSON.parse(fs.readFileSync(path).toString());

        // We can't load this setting without a search engine defined in Chromium thanks to this bug:
        // https://issues.chromium.org/issues/41418973
        // So only bundle it into Firefox, it's needed for new windows in Firefox to use the override.
        if (process.env.FIREFOX_BUILD) {
          manifest.chrome_settings_overrides = { homepage: "index.html" };
        }

        manifest.version = process.env.npm_package_version;
        fs.writeFileSync(path, JSON.stringify(manifest, null, 4));
      },
    },
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    COMMIT_HASH: JSON.stringify(commitHash),
  },
});
