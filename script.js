let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
pauseBtn.disabled = true;
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapTimes = document.getElementById("lapTimes");

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const millisecondsStr = date
    .getUTCMilliseconds()
    .toString()
    .padStart(3, "0")
    .slice(0, 2);
  return `${minutes}:${seconds}:${millisecondsStr}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
    document.querySelector("video").play();
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  running = false;
  // Pause the video
  document.querySelector("video").pause();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  lapTimes.innerHTML = "";
  // Reset the video
  const video = document.querySelector("video");
  video.currentTime = 0;
  video.pause();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function lapTimer() {
  const lapTime = document.createElement("li");
  lapTime.textContent = formatTime(elapsedTime);
  lapTimes.appendChild(lapTime);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);
