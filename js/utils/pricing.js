export function calculateNights(startDate, endDate) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((endDate - startDate) / msPerDay);
}

export function calculateTotalPrice(nights, pricePerNight, people = 1) {
  return nights * pricePerNight * people;
}
