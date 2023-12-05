let main = document.querySelector('main');
let toggleButton = document.querySelector('.toggle-theme');


function changeTheme() {
  main.classList.toggle("dark");
  console.log('gu')
}
toggleButton.addEventListener('click', changeTheme);
