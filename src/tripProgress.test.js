import assert from "node:assert/strict";
import test from "node:test";
import { getDateKey, getDayProgress, getSelectedTripDay } from "./tripProgress.js";

const days = ["9/27", "9/28", "9/29", "9/30", "10/1", "10/2"].map((date, index) => ({
  id: `day-${index + 1}`,
  date,
  items: [
    { id: "first", time: "09:00-10:00", place: "第一站" },
    { id: "last", time: "10:30-11:30", place: "第二站" },
  ],
}));
const at = (day, hour = 9, minute = 0) => {
  const [month, date] = day.date.split("/").map(Number);
  return new Date(2026, month - 1, date, hour, minute);
};

test("opens the matching day throughout the trip, including the month boundary", () => {
  for (const day of days) {
    assert.equal(getSelectedTripDay(days, null, at(day)).id, day.id);
  }
  assert.equal(getSelectedTripDay(days, null, new Date(2026, 8, 23)).id, "day-1");
  assert.equal(getSelectedTripDay(days, null, new Date(2026, 9, 3)).id, "day-6");
  assert.equal(getSelectedTripDay(days, null, new Date(2027, 8, 27)).id, "day-6");
});

test("keeps manual browsing during the day and follows today after midnight", () => {
  const selection = { id: "day-1", selectedOn: getDateKey(at(days[3])) };
  assert.equal(getSelectedTripDay(days, selection, at(days[3], 23, 59)).id, "day-1");
  assert.equal(getSelectedTripDay(days, selection, at(days[4], 0)).id, "day-5");
});

test("shows the current and next stops, including exact start/end boundaries", () => {
  const start = getDayProgress(days[0], at(days[0]));
  assert.equal(start.currentItem.id, "first");
  assert.equal(start.nextItem.id, "last");
  const gap = getDayProgress(days[0], at(days[0], 10));
  assert.equal(gap.currentItem, null);
  assert.equal(gap.nextItem.id, "last");
  assert.equal(gap.text, "行程空檔，等待下一站");
  const last = getDayProgress(days[0], at(days[0], 10, 30));
  assert.equal(last.currentItem.id, "last");
  assert.equal(last.nextItem, null);
});

test("handles before departure, completion, and browsing other dates", () => {
  const before = getDayProgress(days[0], at(days[0], 8));
  assert.equal(before.currentItem, null);
  assert.equal(before.nextItem.id, "first");
  const after = getDayProgress(days[0], at(days[0], 11, 30));
  assert.equal(after.className, "done");
  assert.equal(after.nextItem, null);
  assert.equal(getDayProgress(days[1], at(days[0])).nextItem.id, "first");
  assert.equal(getDayProgress(days[0], at(days[1])).currentItem, null);
  assert.equal(getDayProgress(days[0], at(days[1])).nextItem, null);
});

test("uses the next start or midnight when an end time is omitted", () => {
  const day = { ...days[0], items: [{ time: "09:00", place: "第一站" }, { time: "21:30-", place: "自由活動" }] };
  assert.equal(getDayProgress(day, at(day, 21, 29)).currentItem.place, "第一站");
  assert.equal(getDayProgress(day, at(day, 23, 59)).currentItem.place, "自由活動");
});
