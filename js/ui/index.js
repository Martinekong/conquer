import {
  createDestinationCard,
  createTestimonialCard,
} from './../utils/cards.js';
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

  const destinationsBtn = document.getElementById('destinations-btn');
  destinationsBtn.addEventListener('click', () => {
    window.location.href = './destinations/destinations.html';
  });
}

function showActivity(activity) {
  const activityContainer = document.getElementById('activity-container');
  activityContainer.innerHTML = '';

  activityContainer.style.backgroundImage = `url(${activity.imageUrl})`;

  const activityContent = document.createElement('div');
  activityContent.classList.add('activity-content');

  const activityName = document.createElement('p');
  activityName.classList.add('activity-name');
  activityName.textContent = activity.name;

  const activityDescription = document.createElement('p');
  activityDescription.textContent = activity.description;

  const button = document.createElement('a');
  button.href = `./destinations/destinations.html?activities=${activity.name}`;
  button.classList.add('primary-btn', 'small');
  button.textContent = 'show destinations';

  activityContent.append(activityName, activityDescription, button);
  activityContainer.append(activityContent);
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

  createTestimonialCard(el, container);
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
