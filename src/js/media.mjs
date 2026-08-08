
function createMediaBoxContents(card, media) {
  const cardContents = document.createElement('div');
  cardContents.classList.add('card-contents');

  const title = document.createElement('h2');
  title.textContent = media.title;
  cardContents.appendChild(title);

  const description = document.createElement('p');
  description.textContent = media.description;
  cardContents.appendChild(description);

  return cardContents;
}