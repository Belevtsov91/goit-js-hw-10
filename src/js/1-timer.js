


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const startButton = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates[0]);
  },
};


flatpickr(datetimePicker, options);


function handleDateSelection(selectedDate) {
  if (selectedDate <= new Date()) {
    startButton.disabled = true;
    iziToast.warning({
      title: 'Warning',
      message: 'Please choose a date in the future',
    });
  } else {
    startButton.disabled = false;
    userSelectedDate = selectedDate;
  }
}


startButton.addEventListener('click', startTimer);

function startTimer() {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = userSelectedDate - currentTime;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0);
      datetimePicker.disabled = false;
      startButton.disabled = true;
    } else {
      updateTimerDisplay(remainingTime);
    }
  }, 1000);
}


function updateTimerDisplay(ms) {
  const time = convertMs(ms);

  daysElem.textContent = addLeadingZero(time.days);
  hoursElem.textContent = addLeadingZero(time.hours);
  minutesElem.textContent = addLeadingZero(time.minutes);
  secondsElem.textContent = addLeadingZero(time.seconds);
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
