import {
  getFromLocalStorage,
  deleteFromLocalStorage,
} from './../utils/storage.js';
import { destinations } from './../api/destinations.js';
import { formatDate } from './../utils/calendar.js';
import { createOverlay } from './../utils/overlays.js';

const params = new URLSearchParams(window.location.search);
const bookingId = params.get('id');

const booking = getFromLocalStorage().find((b) => b.id === bookingId);
const country = booking.destination;

if (country) {
  const formattedCountry = country.charAt(0).toUpperCase() + country.slice(1);
  document.title = `${formattedCountry} booking | Conquer`;
}

const destinationData = destinations.find(
  (d) => d.country === booking.destination
);

function renderBooking() {
  const heading = document.getElementById('heading');
  heading.textContent = booking.destination;

  const image = document.getElementById('destination-img');
  image.src = `./../img/destinations/${destinationData.imageUrl}`;
  image.alt = destinationData.imageAlt;

  showBookingDetails();
  showPrice();
}

renderBooking();

function showBookingDetails() {
  const name = document.getElementById('name');
  name.textContent = `${booking.firstName} ${booking.lastName}`;

  const email = document.getElementById('email');
  email.textContent = booking.email;

  const number = document.getElementById('number');
  if (booking.conquerers > 1) {
    number.textContent = `${booking.conquerers} guests`;
  } else {
    number.textContent = `${booking.conquerers} guest`;
  }

  const nights = document.getElementById('nights');
  if (booking.numberOfNights > 1) {
    nights.textContent = `${booking.numberOfNights} nights`;
  } else {
    nights.textContent = `${booking.numberOfNights} night`;
  }

  const dates = document.getElementById('dates');
  dates.textContent = `${formatDate(booking.startDate)} - ${formatDate(
    booking.endDate
  )}`;
}

function showPrice() {
  const priceContainer = document.getElementById('price');

  const total = document.createElement('h2');
  total.textContent = `Total cost: $${booking.totalPrice}`;

  const p = document.createElement('p');
  p.textContent = 'Payment on arrival';

  priceContainer.append(total, p);
}

document.getElementById('cancel-booking-btn').addEventListener('click', () => {
  console.log('delete button clicked');

  const deleteOverlay = document.createElement('div');
  const message = document.createElement('h3');
  message.textContent = `Are you sure you want to cancel your booking to ${booking.destination}?`;

  const p = document.createElement('p');
  p.textContent = 'This action can’t be undone!';
  deleteOverlay.append(message, p);

  const noBtn = document.createElement('button');
  noBtn.classList.add('secondary-btn', 'small');
  noBtn.textContent = 'no, go back';

  const yesBtn = document.createElement('a');
  yesBtn.href = './dashboard.html';
  yesBtn.classList.add('primary-btn', 'small');
  yesBtn.textContent = 'yes, cancel';

  yesBtn.addEventListener('click', () => {
    deleteFromLocalStorage(booking.id);
  });

  createOverlay(deleteOverlay, noBtn, yesBtn);
});
