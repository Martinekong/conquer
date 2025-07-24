import { createDestinationCard } from './../utils/destinations.js';
import { destinations } from './../api/destinations.js';
import { activities } from './../api/activities.js';
import { testimonials } from './../api/testimonials.js';

function renderHomePage() {
  showPopularDestinations();
  const defaultActivity = activities.find(
    (activity) => activity.name === 'hiking'
  );
  showActivity(defaultActivity);
  setupFilterButtons();
  setupTestimonialCarousel(testimonials);
}

function showPopularDestinations() {
  const desinationCarousel = document.getElementById('destination-carousel');

  destinations.splice(0, 3).forEach((destination) => {
    createDestinationCard(destination, desinationCarousel);
  });
}

function showActivity(activity) {
  const activityContainer = document.getElementById('activity-container');
  activityContainer.innerHTML = '';

  activityContainer.style.backgroundImage = `url(${activity.imageUrl})`;

  const activityName = document.createElement('p');
  activityName.classList.add('activity-name');
  activityName.textContent = activity.name;

  const activityDescription = document.createElement('p');
  activityDescription.textContent = activity.description;

  const button = document.createElement('button');
  button.classList.add('secondary-btn', 'large');
  button.textContent = 'book now';

  activityContainer.append(activityName, activityDescription, button);
}

function setupFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach((button) => {
    button.addEventListener('click', () => {
      filterBtns.forEach((btn) => btn.classList.remove('active-filter'));

      button.classList.add('active-filter');

      const category = button.getAttribute('data-category');
      const activity = activities.find(
        (activity) => activity.name === category
      );
      showActivity(activity);
    });
  });
}

let currentIndex = 0;
let testimonialsData = [];

function showSingleTestimonial(index) {
  const container = document.getElementById('testimonials-container');
  container.innerHTML = '';

  const el = testimonialsData[index];
  const testimonialWrapper = document.getElementById('testimonial-wrapper');
  testimonialWrapper.style.backgroundImage = `url('${el.imageSrc}')`;

  const card = document.createElement('div');
  card.classList.add('testimonial-card');

  const customerName = document.createElement('h3');
  customerName.textContent = el.name;

  const starWrapper = document.createElement('div');
  starWrapper.classList.add('testimonial-stars');

  const fullStars = Math.floor(el.stars);
  const halfStar = el.stars % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement('span');
    star.classList.add('material-symbols-outlined', 'star');
    star.textContent = 'star';
    starWrapper.appendChild(star);
  }

  if (halfStar) {
    const half = document.createElement('span');
    half.classList.add('material-symbols-outlined');
    half.textContent = 'star_half';
    starWrapper.appendChild(half);
  }

  const testimonial = document.createElement('p');
  testimonial.textContent = `“${el.content}”`;
  testimonial.classList.add('testimonial-content');

  card.append(customerName, starWrapper, testimonial);
  container.appendChild(card);
}

function setupTestimonialCarousel(content) {
  testimonialsData = content;
  showSingleTestimonial(currentIndex);

  document.getElementById('prev-testimonial').addEventListener('click', () => {
    currentIndex =
      (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
    showSingleTestimonial(currentIndex);
  });

  document.getElementById('next-testimonial').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonialsData.length;
    showSingleTestimonial(currentIndex);
  });
}

renderHomePage();
