import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	moduleDirectories: ["node_modules", "<rootDir>/../node_modules"],
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	testMatch: ["**/?(*.)+(spec|test).ts"],
	collectCoverageFrom: [
		"src/**/*.ts",
		"!src/**/*.d.ts",
		"!src/**/*.test.ts",
		"!src/**/*.spec.ts",
	],
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov", "html"],
	testTimeout: 10000,
};

export default config;
