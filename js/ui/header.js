const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const nav = document.getElementById('mobileMenu');

openMenu.addEventListener('click', () => {
  nav.classList.add('activeMobile');
});

closeMenu.addEventListener('click', () => {
  nav.classList.remove('activeMobile');
});
