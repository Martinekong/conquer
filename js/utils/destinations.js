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

  const btn = document.createElement('button');
  btn.classList.add('text-btn');
  btn.textContent = 'Learn more';

  card.append(image, name, description, btn);
  container.append(card);
}
