import { getPastWeeksRanges } from "~/utils/date.utils";

const API_BASE_URL = "http://127.0.0.1:8000";

export type Keyword = {
  keyword: string;
  count: number;
};

export type WeeklyKeywordData = {
  weekLabel: string;
  dateRangeLabel: string;
  startDate: string;
  endDate: string;
  domestic: Keyword[];
  global: Keyword[];
};

async function fetchKeywords(
  region: "domestic" | "global",
  startDate: string,
  endDate: string,
): Promise<Keyword[]> {
  const url =
    region === "domestic"
      ? `${API_BASE_URL}/weekly-keywords-by-date?start_date=${startDate}&end_date=${endDate}`
      : `${API_BASE_URL}/global-weekly-keywords-by-date?start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${region} keywords`);
    const data: { keywords: Keyword[] } = await response.json();
    return data.keywords.slice(0, 5);
  } catch (error) {
    console.error(error);
    // Return sample data on error
    return region === "domestic"
      ? [
          { keyword: "전기차", count: 10 },
          { keyword: "배터리", count: 8 },
        ]
      : [
          { keyword: "Tesla", count: 20 },
          { keyword: "Apple", count: 15 },
        ];
  }
}

export async function getWeeklyKeywords(): Promise<WeeklyKeywordData[]> {
  const weeksRanges = getPastWeeksRanges(3); // Get ranges for the past 3 weeks

  const weeklyData = await Promise.all(
    weeksRanges.map(async (week) => {
      const [domestic, global] = await Promise.all([
        fetchKeywords("domestic", week.start, week.end),
        fetchKeywords("global", week.start, week.end),
      ]);

      return {
        weekLabel: week.weekLabel,
        dateRangeLabel: week.dateRangeLabel,
        startDate: week.start,
        endDate: week.end,
        domestic,
        global,
      };
    }),
  );
  return weeklyData;
}
