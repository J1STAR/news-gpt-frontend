function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates the date ranges for a given number of past weeks (Mon-Sun).
 * @param numberOfWeeks The number of past weeks to calculate.
 * @returns An array of objects, each with start and end dates.
 */
export function getPastWeeksRanges(numberOfWeeks: number): {
  weekLabel: string;
  dateRangeLabel: string;
  start: string;
  end: string;
}[] {
  const ranges = [];
  const today = new Date();

  // Determine the most recent Sunday that has passed.
  const daysToSubtract = today.getDay() === 0 ? 7 : today.getDay();
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - daysToSubtract);
  lastSunday.setHours(0, 0, 0, 0); // Normalize to start of day

  for (let i = 0; i < numberOfWeeks; i++) {
    const endDate = new Date(lastSunday);
    endDate.setDate(lastSunday.getDate() - i * 7);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);

    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);

    ranges.push({
      weekLabel: `${i + 1}주 전`,
      dateRangeLabel: `${formattedStart.replace(/-/g, '.')} ~ ${formattedEnd.replace(/-/g, '.')}`,
      start: formattedStart,
      end: formattedEnd,
    });
  }

  return ranges.reverse(); // So it's [3주전, 2주전, 1주전]
} 