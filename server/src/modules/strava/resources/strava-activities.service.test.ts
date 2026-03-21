import { StravaAuth } from "../../../types/strava.types";
import { StravaAthleteProvider } from "../../../providers/strava/StravaProviders";
import { SummaryActivity } from "strava-v3";
import { StravaActivitiesService } from "./strava-activities.service";

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

			const mockActivitiesResponse = [{}] as SummaryActivity[];
			it("should return page of activities", async () => {
				(
					StravaAthleteProvider.prototype.listActivities as jest.Mock
				).mockResolvedValue(mockActivitiesResponse);
				const response = StravaActivitiesService.getActivities(
					mockAuth,
					1,
				);
				expect(response).toEqual(mockActivitiesResponse[0]);
			});
		});
	});
});
