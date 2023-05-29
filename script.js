function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function getTimeString() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const timeString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  return timeString;
}

function updateClock() {
  const clockElement = document.getElementById('clock');
  clockElement.textContent = getTimeString();
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
  const alarmItem = document.createElement('li');
  alarmItem.textContent = alarmTime;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    deleteAlarm(alarmItem);
  });

  alarmItem.appendChild(deleteButton);

  const alarmList = document.getElementById('alarm-list');
  alarmList.appendChild(alarmItem);
}

function deleteAlarm(alarmItem) {
  const alarmList = document.getElementById('alarm-list');
  alarmList.removeChild(alarmItem);
}

function initialize() {
  startClock();

  const setAlarmButton = document.getElementById('set-alarm');
  setAlarmButton.addEventListener('click', setAlarm);
}

initialize();
