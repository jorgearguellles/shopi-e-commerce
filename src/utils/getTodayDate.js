export function getTodayDate() {
  // Create a new Date object to get the current date
  const today = new Date();

  // Extract the month, day, and year components
  const month = today.getMonth() + 1; // Months are zero-based, so add 1
  const day = today.getDate(); // Get the day of the month
  const year = today.getFullYear(); // Get the four-digit year

  // Return the formatted date as a string in month/day/year format
  return `${month}/${day}/${year}`;
}
