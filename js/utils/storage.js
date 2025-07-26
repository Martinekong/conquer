export function saveToLocalStorage(booking) {
  const bookings = getFromLocalStorage();
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

export function getFromLocalStorage() {
  const data = localStorage.getItem('bookings');
  return data ? JSON.parse(data) : [];
}

export function deleteFromLocalStorage(id) {
  const bookings = getFromLocalStorage().filter((b) => b.id !== id);
  localStorage.setItem('bookings', JSON.stringify(bookings));
}
