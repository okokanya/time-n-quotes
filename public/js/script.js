(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;class TimeQuote{constructor(e){this.blockItem=e.blockItem,this.blockAuthor=e.blockAuthor,this.blockSource=e.blockSource}getQuote(){const e=new Date,t=e.getHours(),o=e.getMinutes();fetch(`/api?time=${t}${o<10?`0${o}`:o}`).then((e=>e.json())).then((e=>{e.status?(this.blockItem.innerHTML=e.data.quote,this.blockAuthor.innerHTML=e.data.author,this.blockSource.innerHTML=e.data.source):(this.blockItem.innerHTML=this.setWordTime(t,o),this.blockAuthor.innerHTML="",this.blockSource.innerHTML="")})).catch((e=>{console.error("data request fails: ",e)}))}setWordTime(e,t){const o=["ночи","утра","дня","вечера"],s=["час","часа","часов"],r=["минута","минуты","минут"],i=["двадцать","тридцать","сорок","пятьдесят"],c=["одна","две","три","четыре","пять","шесть","семь","восемь","девять","десять","одиннадцать","двенадцать","тринадцать","четырнадцать","пятнадцать","шестнадцать","семнадцать","восемнадцать","девятнадцать"];let l=e>12?e-12:e,u=t;switch(l){case 1:l=s[0].replace(s[0][0],s[0][0].toUpperCase());break;case 2:l="Два";break;default:l=c[l-1].replace(c[l-1][0],c[l-1][0].toUpperCase())}if(u<20)u=` и ${c[u-1]}`,u+=1==u?` ${r[0]}`:u>1&&u<5?` ${r[1]}`:` ${r[2]}`;else if(u>19&&u%10==0)u/=10,u=` и ${i[u-2]} ${r[2]}`;else{let e;u=String(u).split(""),e=1==u[1]?` ${r[0]}`:u[1]>1&&u[1]<5?` ${r[1]}`:` ${r[2]}`,u=`и ${i[u[0]-2]} ${c[u[1]-1]} ${e}`}let a=e;return a<6?(a>1&&a<5&&(l+=` ${s[1]}`),0===a&&(l+=` ${s[2]}`),l+=` ${o[0]}`):a>5&&a<13?l+=` ${s[2]} ${o[1]}`:13===a?l+=` ${o[2]}`:a>13&&a<17?l+=` ${s[1]} ${o[2]}`:a>16&&(l+=` ${s[2]} ${o[3]}`),`${l} ${u}`}getTimer(){this.getQuote(),setInterval((()=>{setTimeout(this.getQuote())}),1e4)}}exports.default=TimeQuote;

},{}],2:[function(require,module,exports){
"use strict";var _toggleTheme=require("./toggle-theme.js"),_getQuote=_interopRequireDefault(require("./getQuote.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}const timeChecker=new _getQuote.default({blockItem:document.querySelector(".quote-block--item"),blockAuthor:document.querySelector(".quote-block--author"),blockSource:document.querySelector(".quote-block--source")}),main=document.querySelector("main"),toggleButton=document.querySelector(".toggle-theme");(0,_toggleTheme.themeToggler)(main,toggleButton),timeChecker.getTimer();

},{"./getQuote.js":1,"./toggle-theme.js":3}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.themeToggler=void 0;const themeToggler=(e,t)=>{t.addEventListener("click",(()=>{e.classList.toggle("dark")}))};exports.themeToggler=themeToggler;

},{}]},{},[2])

//# sourceMappingURL=script.js.map
