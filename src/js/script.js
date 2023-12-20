import { themeToggler } from './toggle-theme.js';
import TimeQuote from './getQuote.js';

const timeChecker = new TimeQuote({
    blockItem: document.querySelector('.quote-block--item'),
    blockAuthor: document.querySelector('.quote-block--author'),
    blockSource: document.querySelector('.quote-block--source'),

});
const main = document.querySelector('main');
const toggleButton = document.querySelector('.toggle-theme');
themeToggler(main,toggleButton);
timeChecker.getTimer();
