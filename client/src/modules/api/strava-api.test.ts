import { describe, test, expect, vi } from "vitest";
import { fetchStravaActivitiesFromAPI } from "./strava-api";

describe("fetchStravaActivitiesFromAPI", () => {
	test("should fetch pages until empty page is received", async () => {
		const fetchSpy = vi.spyOn(global, "fetch");

		fetchSpy
			// First page: has data
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [{ id: "a" }, { id: "b" }],
							rateLimitExceeded: false,
							error: "",
						}),
				} as Response),
			)
			// Second page: has data
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [{ id: "c" }, { id: "d" }],
							rateLimitExceeded: false,
							error: "",
						}),
				} as Response),
			)
			// Third page: empty activities
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [],
							rateLimitExceeded: false,
							error: "",
						}),
				} as Response),
			);

		const result = await fetchStravaActivitiesFromAPI();

		expect(result.length === 4);
		expect(fetchSpy).toHaveBeenCalledTimes(3);

		fetchSpy.mockRestore();
	});
	test("should return data received before error", async () => {
		const consoleWarnSpy = vi.spyOn(console, "warn");
		const fetchSpy = vi.spyOn(global, "fetch");

		fetchSpy
			// First page: has data
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [{ id: "a" }, { id: "b" }],
							rateLimitExceeded: false,
							error: "",
						}),
				} as Response),
			)
			// Second page: has data
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [{ id: "c" }, { id: "d" }],
							rateLimitExceeded: false,
							error: "",
						}),
				} as Response),
			)
			// Third page: error
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [],
							rateLimitExceeded: false,
							error: "error: test",
						}),
				} as Response),
			);

		const result = await fetchStravaActivitiesFromAPI();

		expect(result.length === 4);
		expect(fetchSpy).toHaveBeenCalledTimes(3);
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			"Received error after data: error: test",
		);

		fetchSpy.mockRestore();
		consoleWarnSpy.mockRestore();
	});
	test("should return data received before rate limit exceeded", async () => {
		const fetchSpy = vi.spyOn(global, "fetch");
		const consoleWarnSpy = vi.spyOn(console, "warn");

		fetchSpy
			// First page: has data
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [{ id: "a" }, { id: "b" }],
							rateLimitExceeded: false,
							error: "",
						}),
				} as Response),
			)
			// Second page: has data
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [{ id: "c" }, { id: "d" }],
							rateLimitExceeded: false,
							error: "",
						}),
				} as Response),
			)
			// Third page: rate limit exceeded
			.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					json: () =>
						Promise.resolve({
							activities: [],
							rateLimitExceeded: true,
							error: "",
						}),
				} as Response),
			);

		const result = await fetchStravaActivitiesFromAPI();

		expect(result.length === 4);
		expect(fetchSpy).toHaveBeenCalledTimes(3);
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			"Received error after data: Rate limit exceeded",
		);

		fetchSpy.mockRestore();
		consoleWarnSpy.mockRestore();
	});
});
