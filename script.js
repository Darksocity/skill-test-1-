function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function getTimeString() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = formatTime(hours % 12 || 12);

  const timeString = `${formattedHours}:${formatTime(minutes)}:${formatTime(seconds)} ${amPm}`;
  return timeString;
}


function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = formatTime(hours % 12 || 12);

  const timeString = `${formattedHours}:${formatTime(minutes)}:${formatTime(seconds)} ${amPm}`;
  clockElement.textContent = timeString;
}
function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function setAlarm() {
  const hourInput = document.getElementById('hour');
  const minuteInput = document.getElementById('minute');
  const secondInput = document.getElementById('second');
  const amPmInput = document.getElementById('am-pm');

  const hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const second = parseInt(secondInput.value);
  const amPm = amPmInput.value;

  const alarmTime = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)} ${amPm}`;

  const alarmRectangle = document.createElement('div');
  alarmRectangle.classList.add('alarm-rectangle');
  const randomColor = getRandomColor();
  alarmRectangle.style.backgroundColor = randomColor;

  const alarmTimeElement = document.createElement('div');
  alarmTimeElement.classList.add('alarm-time');
  alarmTimeElement.textContent = alarmTime;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    deleteAlarm(alarmRectangle);
  });

  alarmRectangle.appendChild(alarmTimeElement);
  alarmRectangle.appendChild(deleteButton);

  const alarmList = document.getElementById('alarm-list');
  alarmList.appendChild(alarmRectangle);
}

function deleteAlarm(alarmRectangle) {
  const alarmList = document.getElementById('alarm-list');
  alarmList.removeChild(alarmRectangle);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function initialize() {
  startClock();

  const setAlarmButton = document.getElementById('set-alarm');
  setAlarmButton.addEventListener('click', setAlarm);
}

initialize();
