import { destinations } from './../api/destinations.js';
import { activities } from './../api/activities.js';

const params = new URLSearchParams(window.location.search);
const country = params.get('id');

function renderCountry() {
  const countryToRender = destinations.find(
    (destination) => destination.country === country
  );
  const container = document.getElementById('country-container');
  document.getElementById('country-heading').textContent =
    countryToRender.country;

  const image = createImage(countryToRender);
  const about = createAboutSection(countryToRender);
  const facts = createFunFactSection(countryToRender);
  const activities = createActivitySection(countryToRender);
  const price = createPriceSection(countryToRender);
  const button = createBookButton();

  container.append(image, about, facts, activities, price, button);
}

function createImage(country) {
  const image = document.createElement('img');
  image.src = country.imageUrl;
  image.alt = country.imageAlt;
  return image;
}

function createAboutSection(country) {
  const section = document.createElement('div');
  section.classList.add('about-section');

  const aboutHeading = document.createElement('h2');
  aboutHeading.textContent = 'about';

  const aboutLocation = document.createElement('div');
  aboutLocation.classList.add('about-location');

  const icon = document.createElement('span');
  icon.classList.add('material-symbols-outlined');
  icon.textContent = 'location_on';

  const location = document.createElement('p');
  location.textContent = country.continent;

  aboutLocation.append(icon, location);

  const aboutText = document.createElement('p');
  aboutText.textContent = country.content;

  section.append(aboutHeading, aboutLocation, aboutText);
  return section;
}

function createFunFactSection(country) {
  const section = document.createElement('div');
  section.classList.add('funfact-section');

  const funFactHeading = document.createElement('h2');
  funFactHeading.textContent = 'fun facts';

  section.append(funFactHeading);

  country.funFacts.forEach((fact) => {
    const singleFunFact = document.createElement('div');
    singleFunFact.classList.add('single-funfact');

    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined', 'funfact-icon');
    icon.textContent = 'chevron_forward';

    const factContent = document.createElement('p');
    factContent.textContent = fact;

    singleFunFact.append(icon, factContent);
    section.append(singleFunFact);
  });
  return section;
}

function createActivitySection(country) {
  const section = document.createElement('div');
  section.classList.add('activity-section');

  const activityHeading = document.createElement('h2');
  activityHeading.textContent = 'activities';

  section.append(activityHeading);

  const matchedActivities = activities.filter((activity) =>
    activity.locations.some((loc) => loc === country.country)
  );

  matchedActivities.forEach((activity) => {
    const singleActivity = document.createElement('div');
    singleActivity.classList.add('single-activity');
    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined');

    icon.textContent = activity.icon || 'arrow_right';

    const name = document.createElement('p');
    name.textContent = activity.name;

    singleActivity.append(icon, name);
    section.append(singleActivity);
  });
  return section;
}

function createPriceSection(country) {
  const section = document.createElement('div');
  section.classList.add('price-container');

  const price = document.createElement('h2');
  price.classList.add('price');
  price.textContent = `Price per night: $${country.price}`;

  const priceText = document.createElement('p');
  priceText.textContent = 'Payment on arrival';

  section.append(price, priceText);
  return section;
}

function createBookButton() {
  const bookBtn = document.createElement('a');
  bookBtn.href = './../booking/booking.html';
  bookBtn.textContent = 'book now';
  bookBtn.classList.add('secondary-btn', 'large');
  return bookBtn;
}

renderCountry();
