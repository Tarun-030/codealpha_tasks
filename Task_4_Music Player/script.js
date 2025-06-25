const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playlistEl = document.getElementById("playlist");

const songs = [
  { title: "Golden-Sparrow", artist: "Sublahsini, G.V Prakash Kumar, Dhanush, and Arivu", file: "M1_Golden-Sparrow.mp3" },
  { title: "Ram Siya Ram", artist: "Sachet Tandon, Parampara Thakur", file: "M2_Ram Siya Ram From Adipurush.mp3" },
  { title: "Manma-Emotion-Jaage", artist: "Anushka Manchandan, Antrara Mitra, Pritam Chakraborty", file: "M3_Manma-Emotion-Jaage.mp3" }
];

let currentSong = 0;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  title.textContent = song.title;
  artist.textContent = song.artist;
  updatePlaylistUI(index);
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100;
  current.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function setProgress() {
  audio.currentTime = (progress.value / 100) * audio.duration;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
}

function updatePlaylistUI(index) {
  playlistEl.innerHTML = "";
  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    if (i === index) li.style.color = "#f39c12";
    li.addEventListener("click", () => {
      currentSong = i;
      loadSong(currentSong);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

// Events
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
audio.addEventListener("ended", nextSong); // autoplay

// Init
loadSong(currentSong);
audio.volume = 0.5;