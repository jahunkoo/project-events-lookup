import { describe, it, expect } from 'vitest';
// all functions in date-fns are tested and working
import { startOfDay, startOfWeek, addDays } from 'date-fns';
import { TZDate } from '@date-fns/tz';

import { formatDate, DateTextPattern, getPredefinedDate } from './datetime';

describe('formatDate', () => {
  describe('date is null', () => {
    it('should return empty string', () => {
      expect(formatDate(null, 'MMM d, yyyy, h:mm a')).toBe('');
    });
  });
  const TEST_ISO_DATE_STRING = '2024-12-25T00:00:30.281195Z';
  const testDate = new Date(TEST_ISO_DATE_STRING);
  const testCases: {
    pattern: DateTextPattern;
    timezones: { timezone: string; expected: string }[];
  }[] = [
    {
      pattern: 'MMM d, yyyy, h:mm a' as DateTextPattern,
      timezones: [
        { timezone: 'Asia/Seoul', expected: 'Dec 25, 2024, 9:00 AM' },
        { timezone: 'America/New_York', expected: 'Dec 24, 2024, 7:00 PM' },
        { timezone: 'Asia/Kolkata', expected: 'Dec 25, 2024, 5:30 AM' },
      ],
    },
    {
      pattern: 'yyyy-MM-dd HH:mm' as DateTextPattern,
      timezones: [
        { timezone: 'Asia/Seoul', expected: '2024-12-25 09:00' },
        { timezone: 'America/New_York', expected: '2024-12-24 19:00' },
        { timezone: 'Asia/Kolkata', expected: '2024-12-25 05:30' },
      ],
    },
  ];

  describe(`date is ${TEST_ISO_DATE_STRING}`, () => {
    testCases.forEach(({ pattern, timezones }) => {
      describe(`in pattern '${pattern}'`, () => {
        timezones.forEach(({ timezone, expected }) => {
          it(`should ${expected} in ${timezone} timezone`, () => {
            const zonedDate = new TZDate(testDate, timezone);
            const formatted = formatDate(zonedDate, pattern);
            expect(formatted).toBe(expected);
          });
        });
      });
    });
  });
});

describe('getPredefinedDate', () => {
  const timezones = {
    seoul: 'Asia/Seoul',
    newYork: 'America/New_York',
    bangalore: 'Asia/Kolkata',
  };
  const getTZNow = (timezone: string) => new TZDate(new Date(), timezone);
  Object.entries(timezones).forEach(([name, timezone]) => {
    describe(`in timezone ${name}`, () => {
      /**
       * Notice: 아래 테스트코드는 'getPredefinedDate'의 구현이 변경될 경우를 대비하여 작성되었습니다.
       * expected는 date-fns라이브러리의 기능만을 이용하여 생성한 값입니다.
       *
       */
      it("should return the start of 29 days ago for 'startOf29DaysAgo'", () => {
        const expected = startOfDay(addDays(getTZNow(timezone), -29)).toISOString();
        const result = getPredefinedDate('startOf29DaysAgo', timezone).toISOString();
        expect(result).toEqual(expected);
      });
      it("should return the start of the current week for 'startOfCurrentWeek'", () => {
        const expected = startOfWeek(getTZNow(timezone), { weekStartsOn: 1 }).toISOString();
        const result = getPredefinedDate('startOfCurrentWeek', timezone).toISOString();
        expect(result).toEqual(expected);
      });
      it("should return the start of yesterday for 'startOfYesterday'", () => {
        const expected = startOfDay(addDays(getTZNow(timezone), -1)).toISOString();
        const result = getPredefinedDate('startOfYesterday', timezone).toISOString();
        expect(result).toEqual(expected);
      });
      it("should return the start of today for 'startOfToday'", () => {
        const expected = startOfDay(getTZNow(timezone)).toISOString();
        const result = getPredefinedDate('startOfToday', timezone).toISOString();
        expect(result).toEqual(expected);
      });
      it("should return the current date and time for 'now'", () => {
        const expected = getTZNow(timezone).getTime();
        const result = getPredefinedDate('now', timezone).getTime();
        expect(result).toBeCloseTo(expected, -2); // Allow small differences
      });
      it("should return the start of tomorrow for 'startOfTomorrow'", () => {
        const expected = startOfDay(addDays(getTZNow(timezone), 1)).toISOString();
        const result = getPredefinedDate('startOfTomorrow', timezone).toISOString();
        expect(result).toEqual(expected);
      });
    });
  });
});
