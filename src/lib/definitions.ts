export type PeopleAnalyticsData = Record<string, Record<string, number>>;

export interface PeopleAnalyticsResponse {
  headcountMensal: PeopleAnalyticsData;
  turnoverMensal: PeopleAnalyticsData;
}
