// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let song = [
  {
    songName: "Warriyo - Mortals",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "songs/2.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "DEAF KEV - Invincible",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Different Heaven - My Heart",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Janji - Heroes Tonight",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "songs/4.mp3",
    coverPath: "covers/10.jpg",
  },
];

// song data set
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = song[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = song[i].songName;
});

// Master play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

// Seekbar change
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Function: Make all buttons play
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((el) => {
    el.classList.add("fa-play-circle");
    el.classList.remove("fa-pause-circle");
  });
};

// Individual song play button
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");

      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = song[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;

      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

// Next button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) songIndex = 0;
  else songIndex += 1;

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = song[songIndex].songName;

  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

// Previous button
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) songIndex = 0;
  else songIndex -= 1;

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = song[songIndex].songName;

  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

let audioElements = new Audio();
let currentIndex = -1;

// Get all play buttons inside song list
let playButtons = document.querySelectorAll(".songItemPlay");

playButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // If clicking on another song, reset all buttons first
    playButtons.forEach((b) => {
      b.classList.remove("fa-pause-circle");
      b.classList.add("fa-play-circle");
    });

    // If same song was playing → toggle pause
    if (currentIndex === index && !audioElements.paused) {
      audioElements.pause();
      btn.classList.remove("fa-pause-circle");
      btn.classList.add("fa-play-circle");
      return;
    }

    // Set active song index
    currentIndex = index;

    // Update audio source (apna audio path lagana)
    audioElements.src = `songs/${index + 1}.mp3`;
    audioElements.play();

    // Change current button to pause
    btn.classList.remove("fa-play-circle");
    btn.classList.add("fa-pause-circle");
  });
});
