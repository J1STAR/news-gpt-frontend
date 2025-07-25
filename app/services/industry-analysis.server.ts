import { getPastWeeksRanges } from "~/utils/date.utils";

const API_BASE_URL = "http://127.0.0.1:8000";

export type Keyword = {
  keyword: string;
  reason: string;
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
          { keyword: "전기차", count: 10, reason: "전기차 시장 성장" },
          { keyword: "배터리", count: 8, reason: "배터리 시장 성장" },
        ]
      : [
          { keyword: "Tesla", count: 20, reason: "Tesla 시장 성장" },
          { keyword: "Apple", count: 15, reason: "Apple 시장 성장" },
        ];
  }
}

export async function getWeeklyKeywords(): Promise<WeeklyKeywordData[]> {
  const weeksRanges = getPastWeeksRanges(2); // Get ranges for the past n weeks

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
