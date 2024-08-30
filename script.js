document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progressBar');
    const fileInput = document.getElementById('fileInput');
    const currentTimeDisplay = document.getElementById('currentTime');

    let playlist = [];
    let currentTrackIndex = -1;

    // Load and play selected file
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            audio.src = url;
            audio.play();
            currentTrackIndex = 0;
            updateTrackDetails();
        }
    });

    // Play current track
    playButton.addEventListener('click', () => {
        audio.play();
    });

    // Pause current track
    pauseButton.addEventListener('click', () => {
        audio.pause();
    });

    // Stop playback
    stopButton.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
    });

    // Skip to previous track
    prevButton.addEventListener('click', () => {
        if (playlist.length > 0) {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            audio.src = playlist[currentTrackIndex];
            audio.play();
        }
    });

    // Skip to next track
    nextButton.addEventListener('click', () => {
        if (playlist.length > 0) {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            audio.src = playlist[currentTrackIndex];
            audio.play();
        }
    });

    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration)) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }
    });

    // Seek through the track
    progressBar.addEventListener('input', () => {
        const value = progressBar.value;
        audio.currentTime = (value / 100) * audio.duration;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateTrackDetails() {
        if (audio.src) {
            audio.play();
            // Update playlist or track details here
        }
    }
});
