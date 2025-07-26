const playBtn = document.getElementById('play-button');
const video = document.getElementById('about-video');

playBtn.addEventListener('click', () => {
  video.play();
  playBtn.style.display = 'none';
});

video.addEventListener('ended', () => {
  playBtn.style.display = 'block';
});
