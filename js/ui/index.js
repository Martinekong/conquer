import { createDestinationCard } from './../utils/destinations.js';
import { destinations } from './../api/destinations.js';
import { activities } from './../api/activities.js';

function renderHomePage() {
  showPopularDestinations();
  const defaultActivity = activities.find(
    (activity) => activity.name === 'hiking'
  );
  showActivity(defaultActivity);
  setupFilterButtons();
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

renderHomePage();
