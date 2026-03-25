import { StravaAuth } from "../../../types/strava.types";
import {
	StravaAthleteProvider,
	StreamSetAltitudeDistance,
	StreamSetLatLngDistance,
} from "../../../providers/strava/StravaProviders";
import { LatLngStream, StreamSet, SummaryActivity } from "strava-v3";
import {
	parseStreamResponse,
	StravaActivitiesService,
} from "./strava-activities.service";

jest.mock("../../../providers/strava/StravaProviders");

describe("strava-activities-service", () => {
	// describe('mapSportColor', () => {}); // TODO
	describe("parseStreamResponse", () => {
		const activityAltitudeStream: StreamSetAltitudeDistance = {
			altitude: {
				data: [100, 101, 102],
				series_type: "distance",
				original_size: 3,
				resolution: "high",
			},
			distance: {
				data: [0, 1, 2],
				series_type: "distance",
				original_size: 3,
				resolution: "high",
			},
		};

		const activityPositionStream: StreamSetLatLngDistance = {
			latlng: {
				data: [
					[0, 0],
					[1, 1],
					[2, 2],
				],
				series_type: "distance",
				original_size: 3,
				resolution: "high",
			},
			distance: {
				data: [0, 1, 2],
				series_type: "distance",
				original_size: 3,
				resolution: "high",
			},
		};
		it("should parse latlng and altitude streams to list of coordinates", () => {
			const result = parseStreamResponse(
				activityAltitudeStream,
				activityPositionStream,
			);
			expect(result).toEqual([
				{
					distance: 0,
					latitude: 0,
					longitude: 0,
					altitude: 100,
				},
				{
					distance: 1,
					latitude: 1,
					longitude: 1,
					altitude: 101,
				},
				{
					distance: 2,
					latitude: 2,
					longitude: 2,
					altitude: 102,
				},
			]);
		});
		it("should throw error if input is nullish", () => {
			let activityAltitudeStreamEmptyData =
				null as unknown as StreamSetAltitudeDistance;
			try {
				parseStreamResponse(
					activityAltitudeStreamEmptyData,
					activityPositionStream,
				);
			} catch (error) {
				expect(error.message).toEqual(
					"parseStreamResponse inputs cannot be nullish",
				);
			}
		});
		it("should throw error if input data is not of same length", () => {
			const modifiedActivityAltitudeStream: StreamSetAltitudeDistance = {
				altitude: {
					data: [100, 101, 102, 103],
					series_type: "distance",
					original_size: 3,
					resolution: "high",
				},
				distance: {
					data: [0, 1, 2, 3],
					series_type: "distance",
					original_size: 3,
					resolution: "high",
				},
			};
			try {
				parseStreamResponse(
					modifiedActivityAltitudeStream,
					activityPositionStream,
				);
			} catch (error) {
				expect(error.message).toEqual(
					"parseStreamResponse input data arguments must be identical length",
				);
			}
		});
	});
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
