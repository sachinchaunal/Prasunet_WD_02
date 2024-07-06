let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function pause() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        startBtn.textContent = 'Resume';
    }
}

function start() {
    if (!running) {
        if (startBtn.textContent === 'Resume') {
            startBtn.textContent = 'Start';
        }
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false; 
    difference = 0; 
    timeDisplay.innerHTML = '00:00:00.000'; 
    laps = []; 
    lapsContainer.innerHTML = '';
    startBtn.textContent = 'Start';
}

function lap() {
    if (running) {
        laps.push(difference);
        displayLaps();
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function displayLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => {
        let hours = Math.floor((lap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((lap % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((lap % (1000 * 60)) / 1000);
        let milliseconds = Math.floor((lap % 1000) / 10);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        return `<div>Lap ${index + 1}: ${hours}:${minutes}:${seconds}.${milliseconds}</div>`;
    }).join('');
}