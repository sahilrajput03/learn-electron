export function getDateAfterMs(addMs: number) {
  return new Date(Date.now() + addMs);
}
export function getHourWithMinutes(date: Date): string {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // convert 0 -> 12, 13 -> 1, etc.
  const time = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  return time
}

// console.log(getHourWithMinutes(getDateAfterMs(120 * 60 * 1000))) // "12:02 AM"
