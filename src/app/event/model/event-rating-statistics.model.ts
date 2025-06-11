export interface EventRatingsStatistics {
  eventName: string;
  totalVisitors: number;
  totalRatings: number;
  ratingsCount: Record<number, number>;
}
