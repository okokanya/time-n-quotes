export const themeToggler = (main, toggleButton) => {
  toggleButton.addEventListener('click', () => {
    main.classList.toggle("dark");
  });
}