import { getFromLocalStorage } from './../utils/storage.js';
import { destinations } from './../api/destinations.js';

function createBookingCard() {
  const bookings = getFromLocalStorage();
  const bookingContainer = document.getElementById('booking-container');
  bookingContainer.classList.add('booking-container');
  const bookBtn = document.getElementById('book-btn');

  if (bookings.length < 1) {
    const message = document.createElement('p');
    message.textContent = 'You currently have no bookings!';
    bookBtn.textContent = 'book now';
    bookingContainer.append(message);
  } else {
    bookBtn.textContent = 'book more';
  }

  bookings.forEach((booking) => {
    const singleBookingCard = document.createElement('div');
    singleBookingCard.classList.add('single-booking-card');

    const destinationData = destinations.find(
      (d) => d.country === booking.destination
    );

    console.log(destinationData);
    const image = document.createElement('img');
    image.classList.add('booking-img');
    image.src = destinationData.imageUrl;
    image.alt = destinationData.imageAlt;

    const bookingInfo = document.createElement('div');
    bookingInfo.classList.add('booking-info');

    const destination = document.createElement('h2');
    destination.textContent = booking.destination;

    const startDiv = document.createElement('div');
    const startFrom = document.createElement('p');
    startFrom.textContent = 'From:';
    const startDate = document.createElement('p');
    startDate.textContent = formatDate(booking.startDate);
    startDiv.append(startFrom, startDate);

    const endDiv = document.createElement('div');
    const endTo = document.createElement('p');
    endTo.textContent = 'To:';
    const endDate = document.createElement('p');
    endDate.textContent = formatDate(booking.endDate);

    endDiv.append(endTo, endDate);

    const textBtn = document.createElement('a');
    textBtn.textContent = 'view booking';
    textBtn.classList.add('text-btn');
    textBtn.href = `./view-booking.html?id=${booking.id}`;

    bookingInfo.append(destination, startDiv, endDiv, textBtn);
    singleBookingCard.append(image, bookingInfo);
    bookingContainer.append(singleBookingCard);
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
}

createBookingCard();
