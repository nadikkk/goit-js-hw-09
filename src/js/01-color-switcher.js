const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;
let disabledBtnStart = false;
btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);
function onStart() {
	if (disabledBtnStart) {
		return;
	}
	timerId  = setInterval(() => {
		body.style.backgroundColor = getRandomHexColor();
		}, 1000);
		disabledBtnStart=true;
};
function onStop() {
	clearInterval(timerId);
	disabledBtnStart=false;
}
function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
 };