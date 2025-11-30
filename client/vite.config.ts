import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [react({ jsxRuntime: "automatic" }), tsconfigPaths()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: (content: string, filename: string) => {
					// Don't auto-import variables.scss into itself or global.scss
					if (
						filename.includes("variables.scss") ||
						filename.includes("global.scss")
					) {
						return content;
					}
					return `@use "@/styles/variables.scss" as *;\n${content}`;
				},
			},
		},
	},
	server: {
		port: 5173,
		watch: {
			ignored: ["**/node_modules/**", "**/.git/**"],
		},
		hmr: {
			overlay: true,
		},
	},
	build: {
		outDir: "dist",
	},
});
