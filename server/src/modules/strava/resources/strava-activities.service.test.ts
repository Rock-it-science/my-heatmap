import { StravaAuth } from "../../../types/strava.types";
import { StravaAthleteProvider } from "../../../providers/strava/StravaProviders";
import { SummaryActivity } from "strava-v3";
import { StravaActivitiesService } from "./strava-activities.service";

jest.mock("../../../providers/strava/StravaProviders");

describe("strava-activities-service", () => {
	describe("StravaActivitiesService", () => {
		describe("getActivities", () => {
			const mockAuth: StravaAuth = {
				athlete: {
					id: 123,
				},
				accessToken: {
					code: "mockCode",
				},
			} as StravaAuth;

			const MockAthleteProvider =
				StravaAthleteProvider as jest.MockedClass<
					typeof StravaAthleteProvider
				>;
			const mockAthleteProviderInstance = new MockAthleteProvider(
				mockAuth,
			) as jest.Mocked<StravaAthleteProvider>;

			const mockActivitiesResponse = [] as SummaryActivity[];
			it("should return page of activities", async () => {
				const service = new StravaActivitiesService(
					mockAthleteProviderInstance,
				);

				const result = await service.getActivities(0);
				expect(result.activities).toEqual(mockActivitiesResponse);
			});
		});
	});
});
