import { createDestinationCard } from './../utils/cards.js';
import { createOverlay } from './../utils/overlays.js';
import { destinations } from './../api/destinations.js';
import { activities } from './../api/activities.js';

const destinationsGrid = document.getElementById('destinations-grid');

function renderDestinations() {
  const params = new URLSearchParams(window.location.search);
  const activityFilter = params.get('activities');

  if (activityFilter) {
    filterDestinationsByActivity(activityFilter);
  } else {
    showAllDestinations();
  }

  showFilterOverlay();
  filterAllDestinations();
}

function showAllDestinations() {
  destinationsGrid.innerHTML = '';

  showSkeletonCards(destinations.length);

  setTimeout(() => {
    destinationsGrid.innerHTML = '';
    destinations.forEach((destination) => {
      createDestinationCard(destination, destinationsGrid);
    });
  }, 1000);
}

function filterDestinationsByActivity(activityName) {
  const activity = activities.find((a) => a.name === activityName);

  if (!activity) {
    showAllDestinations();
    return;
  }

  const matchingDestinations = destinations.filter((dest) =>
    activity.locations.includes(dest.country)
  );

  destinationsGrid.innerHTML = '';

  if (matchingDestinations.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No destinations found for that activity.';
    message.classList.add('filter-error');
    destinationsGrid.appendChild(message);
    return;
  }

  showSkeletonCards(matchingDestinations.length);

  setTimeout(() => {
    destinationsGrid.innerHTML = '';
    matchingDestinations.forEach((dest) => {
      createDestinationCard(dest, destinationsGrid);
    });
  }, 1000);
}

function showFilterOverlay() {
  const filterBtn = document.getElementById('filter-btn');
  filterBtn.addEventListener('click', createFilterOptions);
}

function createFilterOptions() {
  const filterOptions = document.createElement('div');

  const filterHeading = document.createElement('h2');
  filterHeading.textContent = 'filter';

  const continentSection = document.createElement('div');
  continentSection.classList.add('continent-section');
  const continentLabel = document.createElement('label');
  continentLabel.setAttribute('for', 'continent-select');
  continentLabel.textContent = 'Continent';

  const continentSelect = document.createElement('select');
  continentSelect.id = 'continent-select';

  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All';
  continentSelect.appendChild(allOption);

  const continents = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Oceania',
  ];

  continents.forEach((cont) => {
    const option = document.createElement('option');
    option.value = cont.toLowerCase().replace(' ', '-');
    option.textContent = cont;
    continentSelect.appendChild(option);
  });

  continentSection.append(continentLabel, continentSelect);

  const activitySection = document.createElement('div');
  activitySection.classList.add('activity-section');
  const activitiesLabel = document.createElement('label');
  activitiesLabel.textContent = 'Activities';

  activitySection.append(activitiesLabel);

  const selectedActivities = new Set();
  const activityButtons = document.createElement('div');
  activityButtons.classList.add('activity-buttons');

  const sortedActivities = [...activities].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  sortedActivities.forEach((activity) => {
    const button = document.createElement('button');
    button.classList.add('filter-btn');
    button.textContent = activity.name;

    button.addEventListener('click', () => {
      if (selectedActivities.has(activity.name)) {
        selectedActivities.delete(activity.name);
        button.classList.remove('selected');
      } else {
        selectedActivities.add(activity.name);
        button.classList.add('selected');
      }
    });

    activityButtons.append(button);
  });

  activitySection.append(activityButtons);

  const applyBtn = document.createElement('button');
  applyBtn.textContent = 'Apply Filter';
  applyBtn.classList.add('secondary-btn', 'small');
  filterDestinations(applyBtn, continentSelect, selectedActivities);

  filterOptions.append(filterHeading, continentSection, activitySection);

  createOverlay(filterOptions, applyBtn);
}

function filterAllDestinations() {
  const allFilterBtn = document.getElementById('all-filter-btn');

  allFilterBtn.addEventListener('click', () => {
    showAllDestinations();

    history.pushState(null, '', 'destinations.html');

    console.log('all destinations shown');
  });
}

function filterDestinations(button, continentSelect, selectedActivities) {
  button.addEventListener('click', () => {
    const selectedContinent = continentSelect.value;
    const selectedActivityArray = Array.from(selectedActivities);

    const params = new URLSearchParams();
    params.set('continent', selectedContinent);
    if (selectedActivityArray.length > 0) {
      params.set('activities', selectedActivityArray.join('+'));
    }

    history.pushState(null, '', `?${params.toString()}`);

    let filteredDestinations = destinations;

    if (selectedContinent !== 'all') {
      filteredDestinations = filteredDestinations.filter(
        (dest) => dest.continent === selectedContinent
      );
    }

    if (selectedActivityArray.length > 0) {
      filteredDestinations = filteredDestinations.filter((dest) => {
        return selectedActivityArray.every((activityName) => {
          const activity = activities.find((act) => act.name === activityName);
          return activity?.locations.includes(dest.country);
        });
      });
    }

    destinationsGrid.innerHTML = '';

    if (filteredDestinations.length === 0) {
      const filterError = document.createElement('p');
      filterError.textContent = 'No destination matches your filter';
      filterError.classList.add('filter-error');
      destinationsGrid.appendChild(filterError);
    } else {
      showSkeletonCards(filteredDestinations.length);

      setTimeout(() => {
        destinationsGrid.innerHTML = '';
        filteredDestinations.forEach((dest) => {
          createDestinationCard(dest, destinationsGrid);
        });
      }, 1000);
    }
  });
}

function showSkeletonCards(count = 6) {
  destinationsGrid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.classList.add('skeleton-card');
    destinationsGrid.appendChild(skeleton);
  }
}

renderDestinations();
