const artist = document.getElementById("artist");
const title = document.getElementById("title");
const image = document.querySelector("img");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "chicken",
    displayName: "Daddy what u cooking?",
    album: "chicken",
    artist: "Willian & Matheus",
  },
  {
    name: "emo",
    displayName: "EMO",
    album: "dark",
    artist: "Willian & Matheus",
  },
  {
    name: "jacinto-3",
    album: "jacinto-3",
    displayName: "Seven Nation Army(remix)",
    artist: "Jacinto",
  },
];

// check if playing
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
// stop
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// play or pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update the doom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.album}.jpeg`;
}

// Current Song
let songIndex = 0;

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar & time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calculate the duration of the song
    const durationMinutes = Math.floor(duration / 60);
    let secs = Math.floor(duration % 60);
    if (secs < 10) {
      secs = `0${secs}`;
    }
    // delay element to NAN
    if (secs) {
      durationEl.textContent = `${durationMinutes}:${secs}`;
    }
    // calculate the current of the song
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSecs = Math.floor(currentTime % 60);
    if (currentSecs < 10) {
      currentSecs = `0${currentSecs}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSecs}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

// onLoad
loadSong(songs[songIndex]);
