import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import child_process from "child_process";

const commitHash = child_process
  .execSync("git rev-parse --short HEAD")
  .toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    COMMIT_HASH: JSON.stringify(commitHash),
  },
});
