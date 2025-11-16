import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	// Configure for SPA routing - all routes should fall back to index.html
	server: {
		port: 5173, // Vite default port
	},
	build: {
		outDir: "dist",
	},
});
