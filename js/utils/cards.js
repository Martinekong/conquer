export function createDestinationCard(element, container) {
  const card = document.createElement('div');
  card.classList.add('destination-card');

  const image = document.createElement('img');
  image.src = element.imageUrl;
  image.alt = element.imageAlt;

  const name = document.createElement('h3');
  name.textContent = element.country;

  const description = document.createElement('p');
  description.textContent = element.description;

  const btn = document.createElement('a');
  btn.classList.add('text-btn');
  btn.textContent = 'Learn more';

  if (window.location.pathname.includes('index.html')) {
    btn.href = `./destinations/country.html?id=${encodeURIComponent(
      element.country
    )}`;
  } else if (window.location.pathname.includes('destinations.html')) {
    btn.href = `./country.html?id=${encodeURIComponent(element.country)}`;
  }

  card.append(image, name, description, btn);
  container.append(card);
}

export function createTestimonialCard(element, container) {
  const card = document.createElement('div');
  card.classList.add('testimonial-card');

  const customerName = document.createElement('h3');
  customerName.textContent = element.name;

  const starWrapper = document.createElement('div');
  starWrapper.classList.add('testimonial-stars');

  const fullStars = Math.floor(element.stars);
  const halfStar = element.stars % 1 !== 0;

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
  testimonial.textContent = `“${element.content}”`;
  testimonial.classList.add('testimonial-content');

  card.append(customerName, starWrapper, testimonial);
  container.appendChild(card);
}
