const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    volumeSlider = document.getElementById('volume-slider'),
    volumeControl = document.querySelector('.volume-control');

const music = new Audio();

const songs = [
    {
        path: 'img/1.mp3',
        displayName: 'Wonderwall - Remastered',
        cover: 'img/1.png',
        artist: 'Oasis',
    },
    {
        path: 'img/2.mp3',
        displayName: 'On My Way',
        cover: 'img/2.png',
        artist: 'Alan Walker, Sabrina Carpenter, Farruko',
    },
    {
        path: 'img/3.mp3',
        displayName: 'Bunny Girl',
        cover: 'img/3.png',
        artist: 'AKASAKI',
    },
    {
        path: 'img/4.mp3',
        displayName: 'Not Like Us',
        cover: 'img/4.png',
        artist: 'Kendrick',
    },
    {
        path: 'img/5.mp3',
        displayName: 'See You Again (feat. Kali Uchis)',
        cover: 'img/5.png',
        artist: 'Tyler, The Creator, Kali Uchis',
    },    
    {
        path: 'img/6.mp3',
        displayName: 'Fontaine',
        cover: 'img/6.png',
        artist: 'HOYO-MiX',
    },    
    {
        path: 'img/7.mp3',
        displayName: 'Fireflies',
        cover: 'img/7.png',
        artist: 'Owl City',
    },
    {
        path: 'img/8.mp3',
        displayName: 'No Surprises',
        cover: 'img/8.png',
        artist: 'Radiohead',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function toggleVolumeSlider() {
    volumeSlider.style.display = volumeSlider.style.display === 'block' ? 'none' : 'block';
}

function setVolume(e) {
    music.volume = e.target.value;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
volumeControl.addEventListener('click', toggleVolumeSlider);
volumeSlider.addEventListener('input', setVolume);

loadMusic(songs[musicIndex]);