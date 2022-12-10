import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btmStart = document.querySelector ("button[data-start]");
const remainingDays = document.querySelector ("[data-days]");
const remainingHours = document.querySelector ("[data-hours]");
const remainingMinutes = document.querySelector ("[data-minutes]");
const remainingSeconds = document.querySelector ("[data-seconds]");
let disabledBtnStart = false;
let timeId = null;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const selectedDate = selectedDates[0].getTime();
		if (selectedDate - options.defaultDate.getTime() < 0) {
		 	window.alert("Please choose a date in the future")
			return;
		}
		btmStart.style.color = "red";
		disabledBtnStart = true;
		return options.selectedDate = selectedDate;
	},
	   // remainingTime: onClose(),
 };
 flatpickr('input[type="text"]', options);

 btmStart.addEventListener('click', onStartTime);
  function onStartTime() {
	if (!disabledBtnStart) {
		btmStart.style.color = "#212121";
		return;
	}
	disabledBtnStart = false;
	btmStart.style.color = "#212121";
	timeId = setInterval(timeDistribution, 1000)
	
 }
   
function timeDistribution() {
	const timeNow = Date.now();
	// console.log(timeNow);
	const remaining = options.selectedDate - timeNow;
	// console.log(remaining);
	const timeIsDecomposed = convertMs(remaining);
	// console.log(timeIsDecomposed);
	remainingDays.textContent = timeIsDecomposed.days;
	remainingHours.textContent = timeIsDecomposed.hours;
	remainingMinutes.textContent = timeIsDecomposed.minutes;
	remainingSeconds.textContent = timeIsDecomposed.seconds;
	if (remaining===0) {
		clearInterval(timeId); 
	}
	
};
function addLeadingZero(value) {
	return String(value).padStart(2, "0")
}
 function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
 
	// Remaining days
	const days = addLeadingZero(Math.floor(ms / day));
	// Remaining hours
	const hours = addLeadingZero(Math.floor((ms % day) / hour));
	// Remaining minutes
	const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
	// Remaining seconds
	const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
 
	return { days, hours, minutes, seconds };
 }

