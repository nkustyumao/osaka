export const TRIP_YEAR = 2026;

export const formatHeaderTime = (date) =>
  date.toLocaleTimeString("zh-TW", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

export function getDateKey(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function getTripDate(day) {
  const [month, date] = day.date.split("/").map(Number);
  return new Date(TRIP_YEAR, month - 1, date);
}

function compareLocalDate(left, right) {
  const leftDate = new Date(left.getFullYear(), left.getMonth(), left.getDate()).getTime();
  const rightDate = new Date(right.getFullYear(), right.getMonth(), right.getDate()).getTime();
  return Math.sign(leftDate - rightDate);
}

export function getSelectedTripDay(days, selection, now) {
  const selected = selection?.selectedOn === getDateKey(now)
    ? days.find((day) => day.id === selection.id)
    : null;
  if (selected) return selected;

  // Follow today; outside the trip, show the first upcoming or final day.
  return days.find((day) => compareLocalDate(now, getTripDate(day)) <= 0) ?? days.at(-1);
}

function parseClockToMinutes(value) {
  const match = value?.match(/(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function getItemStartMinutes(item) {
  return parseClockToMinutes(item?.time);
}

function getItemEndMinutes(item, itemIndex, items) {
  const endMatch = item.time.match(/[-–—]\s*(\d{1,2}):(\d{2})/);
  if (endMatch) return Number(endMatch[1]) * 60 + Number(endMatch[2]);
  return getItemStartMinutes(items[itemIndex + 1]) ?? 24 * 60;
}

function getProgressStatus(day, item, itemIndex, items, now) {
  const dateCompare = compareLocalDate(now, getTripDate(day));
  if (dateCompare < 0) return "upcoming";
  if (dateCompare > 0) return "done";

  const startMinutes = getItemStartMinutes(item);
  if (startMinutes === null) return "upcoming";
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  if (currentMinutes < startMinutes) return "upcoming";
  if (currentMinutes >= getItemEndMinutes(item, itemIndex, items)) return "done";
  return "current";
}

export function getDayProgress(day, now) {
  const dateCompare = compareLocalDate(now, getTripDate(day));
  const statuses = day.items.map((item, index) => getProgressStatus(day, item, index, day.items, now));
  const currentIndex = statuses.indexOf("current");
  const nextIndex = statuses.findIndex((status, index) => status === "upcoming" && index > currentIndex);
  const currentItem = day.items[currentIndex] ?? null;
  const nextItem = day.items[nextIndex] ?? null;
  const details = { statuses, currentItem, nextItem };

  if (dateCompare < 0) {
    return { ...details, className: "upcoming", label: `${day.date} 尚未開始`, text: "這天的行程尚未開始" };
  }
  if (dateCompare > 0) {
    return { ...details, className: "done", label: `${day.date} 已結束`, text: "這天的行程已結束" };
  }
  if (currentItem) {
    return { ...details, className: "current", label: `現在 ${formatHeaderTime(now)}`, text: currentItem.place };
  }
  if (statuses.every((status) => status === "done")) {
    return { ...details, className: "done", label: "今日行程已結束", text: "今日行程已結束" };
  }
  const hasStarted = statuses.includes("done");
  return {
    ...details,
    className: "upcoming",
    label: `現在 ${formatHeaderTime(now)}`,
    text: hasStarted ? "行程空檔，等待下一站" : "今日行程尚未開始",
  };
}
