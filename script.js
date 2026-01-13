const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

const songs = [
  {
    name: "song1",
    title: "Lover",
    artist: "Taylor Swift",
    cover: "https://upload.wikimedia.org/wikipedia/en/c/cd/Taylor_Swift_-_Lover.png"
  },
  {
    name: "song2",
    title: "The Way I Loved You",
    artist: "Taylor Swift",
    cover: "https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png"
  },
  {
    name: "song3",
    title: "Red",
    artist: "Taylor Swift",
    cover: "https://upload.wikimedia.org/wikipedia/en/e/e8/Taylor_Swift_-_Red.png"
  }
];
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = `music/${song.name}.mp3`;
  updatePlaylist();
}

function playSong() {
  isPlaying = true;
  playBtn.textContent = "⏸";
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.textContent = "▶";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

/* Progress Bar */
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  progress.value = (currentTime / duration) * 100 || 0;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* Volume */
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

/* Autoplay Next */
audio.addEventListener("ended", () => {
  nextBtn.click();
});

/* Playlist */
function updatePlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    if (index === songIndex) li.classList.add("active");

    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

/* Load first song */
loadSong(songs[songIndex]);
