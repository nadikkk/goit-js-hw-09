import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-aio-3.2.5.min.js";

const form = document.querySelector('.form');
const fisthDelay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener("submit", onDataTransfer);

function onDataTransfer(e) {
	e.preventDefault();
	for (let index = 0; index < amount.value; index++) {
		const delay =Number(fisthDelay.value)+step.value*index;
		const position = index+1;
		createPromise(position, delay)
  .then(({ position, delay }) => {
	Notiflix.Notify.failure (`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
	Notiflix.Notify.failure (`❌ Rejected promise ${position} in ${delay}ms`);
  });
	}
}

function createPromise(position, delay) {
	return new Promise ((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout (() => {
	if (shouldResolve) {
		resolve ({position, delay});// Fulfill
	  } else {
		reject ({position, delay});// Reject
	  }
  }, delay);
  });
}


