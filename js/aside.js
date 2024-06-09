const burger_menu_btn = document.querySelectorAll('.burger_menu');
const sidebar = document.querySelector('.sidebar_menu');

const overley = document.querySelector('.overlay');
const body = document.body;

const asideNavBar = () => {
  sidebar.classList.toggle('active');
  overley.classList.toggle('hidden');
  body.classList.toggle('noScroll');
};

burger_menu_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    asideNavBar();
  });
});

overley.addEventListener('click', () => {
  asideNavBar();
});
