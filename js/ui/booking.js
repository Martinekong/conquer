import { destinations } from './../api/destinations.js';
import { saveToLocalStorage } from './../utils/storage.js';
import { createOverlay } from './../utils/overlays.js';
import { calculateNights, calculateTotalPrice } from './../utils/pricing.js';
import {
  initCalendar,
  goToNextMonth,
  goToPrevMonth,
  getSelectedDates,
} from './../utils/calendar.js';

const calendarGrid = document.getElementById('calendar-grid');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let selectedDestination = null;

function renderBookingPage() {
  displayDestinations();
  initCalendar({
    calendarGrid,
    monthYear,
    onDateSelect: updateNightCount,
  });
}

prevMonthBtn.addEventListener('click', () => {
  goToPrevMonth();
});

nextMonthBtn.addEventListener('click', () => {
  goToNextMonth();
});

function displayDestinations() {
  const destinationSelect = document.getElementById('destination');

  destinations.forEach((destination) => {
    const option = document.createElement('option');
    option.value = destination.country;
    option.textContent =
      destination.country.charAt(0).toUpperCase() +
      destination.country.slice(1);
    destinationSelect.append(option);
  });

  destinationSelect.addEventListener('change', (e) => {
    const selected = destinations.find((d) => d.country === e.target.value);
    selectedDestination = selected;

    const calendar = document.getElementById('calendar');
    calendar.classList.toggle('disabled', !selectedDestination);

    updateNightCount();
  });
}

function updateNightCount() {
  const { startDate, endDate } = getSelectedDates();
  const nightSpan = document.getElementById('number-of-nights');
  const priceSpan = document.getElementById('price-number-of-nights');
  const totalSpan = document.getElementById('total-price');
  const pricePerNightSpan = document.getElementById('price-per-night');

  if (!selectedDestination) {
    nightSpan.textContent = 0;
    priceSpan.textContent = 0;
    totalSpan.textContent = 0;
    pricePerNightSpan.textContent = 0;
    return;
  }

  const pricePerNight = selectedDestination.price;
  pricePerNightSpan.textContent = pricePerNight;

  if (startDate && endDate) {
    const nights = calculateNights(startDate, endDate);
    const totalPrice = calculateTotalPrice(nights, pricePerNight);

    nightSpan.textContent = nights;
    priceSpan.textContent = totalPrice;
    totalSpan.textContent = totalPrice;
  } else {
    nightSpan.textContent = 0;
    priceSpan.textContent = 0;
    totalSpan.textContent = 0;
  }
}

function createBookingObject() {
  const { startDate, endDate } = getSelectedDates();
  const firstName = document.getElementById('firstname').value.trim();
  const lastName = document.getElementById('lastname').value.trim();
  const email = document.getElementById('email').value.trim();
  const conquerers = parseInt(document.getElementById('conquerers').value);
  const destination = selectedDestination?.country;
  const pricePerNight = selectedDestination?.price;

  if (
    !firstName ||
    !lastName ||
    !email ||
    isNaN(conquerers) ||
    !destination ||
    !startDate ||
    !endDate
  ) {
    return null;
  }

  const numberOfNights = calculateNights(startDate, endDate);
  const totalPrice = calculateTotalPrice(
    numberOfNights,
    pricePerNight,
    conquerers
  );

  return {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email,
    conquerers,
    destination,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    numberOfNights,
    pricePerNight,
    totalPrice,
  };
}

const confirmBookingBtn = document.getElementById('confirm-booking');

confirmBookingBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const booking = createBookingObject();

  if (!booking) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Please fill out all booking details!';
    const errorBtn = document.createElement('button');
    errorBtn.classList.add('secondary-btn', 'large');
    errorBtn.textContent = 'ok';
    createOverlay(errorMessage, errorBtn);
    return;
  }

  saveToLocalStorage(booking);

  const bookingContainer = document.createElement('div');
  const message = document.createElement('h3');
  message.textContent = 'Your booking has been confirmed!';
  const p = document.createElement('p');
  p.textContent =
    'Go to dashboard to view your booking, or continue exploring!';
  bookingContainer.append(message, p);

  const dashboardBtn = document.createElement('a');
  dashboardBtn.href = './dashboard.html';
  dashboardBtn.classList.add('secondary-btn', 'large');
  dashboardBtn.textContent = 'dashboard';

  const destinationsBtn = document.createElement('a');
  destinationsBtn.href = './../destinations/destinations.html';
  destinationsBtn.classList.add('primary-btn', 'large');
  destinationsBtn.textContent = 'explore more';

  createOverlay(bookingContainer, dashboardBtn, destinationsBtn);
});

renderBookingPage();
