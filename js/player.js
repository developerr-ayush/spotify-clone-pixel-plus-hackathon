// Spotify Clone Player Functionality

// Player state
let playerState = {
  currentTrackId: 0,
  isPlaying: false,
  currentTime: 0,
  volume: 70,
  shuffle: false,
  repeat: "off", // 'off', 'all', 'one'
  queue: [],
  currentPlaylistId: "liked-songs",
};

// DOM elements cache
const elements = {};

// Audio element
let audioElement;

// Initialize the player
function initPlayer() {
  // Cache DOM elements for better performance
  cacheElements();

  // Set up audio element
  setupAudioElement();

  // Load initial data
  loadCurrentPlaylist();

  // Set up event listeners
  setupEventListeners();

  // Update UI to match initial state
  updatePlayerUI();

  // Load the first track
  loadTrack(playerState.queue[0]);
}

// Cache DOM elements
function cacheElements() {
  // Player controls
  elements.playButton = document.getElementById("play-button");
  elements.prevButton = document.getElementById("prev-button");
  elements.nextButton = document.getElementById("next-button");
  elements.shuffleButton = document.getElementById("shuffle-button");
  elements.repeatButton = document.getElementById("repeat-button");

  // Progress and volume
  elements.progressBar = document.getElementById("progress-bar");
  elements.progressFill = document.getElementById("progress-fill");
  elements.progressHandle = document.getElementById("progress-handle");
  elements.currentTimeEl = document.getElementById("current-time");
  elements.totalTimeEl = document.getElementById("total-time");
  elements.volumeBar = document.getElementById("volume-bar");
  elements.volumeFill = document.getElementById("volume-fill");
  elements.volumeHandle = document.getElementById("volume-handle");

  // Track info
  elements.trackCover = document.getElementById("track-cover");
  elements.trackTitle = document.getElementById("track-title");
  elements.trackArtist = document.getElementById("track-artist");
  elements.likeButton = document.getElementById("like-button");

  // Audio player
  audioElement = document.getElementById("audio-player");

  // Playlists and library
  elements.playlistItems = document.querySelectorAll("[data-playlist-id]");
  elements.mainContent = document.getElementById("main-content");
}

// Set up audio element
function setupAudioElement() {
  if (!audioElement) return;

  // Set initial volume
  audioElement.volume = playerState.volume / 100;

  // Add event listeners
  audioElement.addEventListener("timeupdate", () => {
    // Update current time display and progress bar
    playerState.currentTime = Math.floor(audioElement.currentTime);
    updateProgressBar();
  });

  audioElement.addEventListener("loadedmetadata", () => {
    // Set total duration when track is loaded
    const totalSeconds = Math.floor(audioElement.duration);
    elements.totalTimeEl.textContent = formatTime(totalSeconds);
  });

  audioElement.addEventListener("ended", () => {
    // Handle track ending based on repeat mode
    if (playerState.repeat === "one") {
      audioElement.currentTime = 0;
      audioElement.play();
    } else if (playerState.repeat === "all" || playerState.shuffle) {
      playNextTrack();
    } else {
      // If repeat is off and we're at the last track, stop playback
      const currentIndex = playerState.queue.indexOf(
        playerState.currentTrackId
      );
      if (currentIndex < playerState.queue.length - 1) {
        playNextTrack();
      } else {
        playerState.isPlaying = false;
        updatePlayerUI();
      }
    }
  });
}

// Set up event listeners
function setupEventListeners() {
  // Play/Pause button
  if (elements.playButton) {
    elements.playButton.addEventListener("click", togglePlay);
  }

  // Previous track button
  if (elements.prevButton) {
    elements.prevButton.addEventListener("click", playPreviousTrack);
  }

  // Next track button
  if (elements.nextButton) {
    elements.nextButton.addEventListener("click", playNextTrack);
  }

  // Shuffle button
  if (elements.shuffleButton) {
    elements.shuffleButton.addEventListener("click", toggleShuffle);
  }

  // Repeat button
  if (elements.repeatButton) {
    elements.repeatButton.addEventListener("click", toggleRepeat);
  }

  // Progress bar
  if (elements.progressBar) {
    elements.progressBar.addEventListener("click", seekTrack);
  }

  // Volume bar
  if (elements.volumeBar) {
    elements.volumeBar.addEventListener("click", changeVolume);
  }

  // Like button
  if (elements.likeButton) {
    elements.likeButton.addEventListener("click", toggleLike);
  }

  // Playlist items
  elements.playlistItems.forEach((item) => {
    item.addEventListener("click", () => loadPlaylist(item.dataset.playlistId));
  });

  // Play buttons on playlist items
  document.querySelectorAll(".playlist-play-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering the parent click event
      const playlistId =
        button.closest("[data-playlist-id]").dataset.playlistId;
      loadPlaylist(playlistId, true); // Load and immediately play
    });
  });
}

// Toggle play/pause
function togglePlay() {
  playerState.isPlaying = !playerState.isPlaying;

  if (playerState.isPlaying) {
    if (audioElement.readyState >= 2) {
      // HAVE_CURRENT_DATA or higher
      audioElement.play();
    }
  } else {
    audioElement.pause();
  }

  updatePlayerUI();
}

// Load a specific track
function loadTrack(trackId) {
  const track = tracks.find((t) => t.id === trackId);
  if (!track) return;

  playerState.currentTrackId = trackId;
  playerState.currentTime = 0;

  // Update UI with track info
  if (elements.trackTitle) elements.trackTitle.textContent = track.title;
  if (elements.trackArtist) elements.trackArtist.textContent = track.artist;
  if (elements.trackCover && elements.trackCover.querySelector("img")) {
    elements.trackCover.querySelector("img").src = track.coverImage;
  }

  // Reset progress
  elements.currentTimeEl.textContent = "0:00";
  elements.progressFill.style.width = "0%";
  elements.progressHandle.style.left = "0%";

  // Reset audio element
  if (audioElement) {
    audioElement.currentTime = 0;

    // Set the audio source if the track has a specific audio file
    if (
      track.audioSrc &&
      audioElement.querySelector("source").src !== track.audioSrc
    ) {
      audioElement.querySelector("source").src = track.audioSrc;
      audioElement.load(); // Need to call load() when changing source
    }

    if (playerState.isPlaying) {
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }
}

// Play previous track
function playPreviousTrack() {
  const currentIndex = playerState.queue.indexOf(playerState.currentTrackId);
  if (currentIndex > 0) {
    playerState.currentTrackId = playerState.queue[currentIndex - 1];
  } else {
    // Wrap around to the end if at the beginning
    playerState.currentTrackId =
      playerState.queue[playerState.queue.length - 1];
  }

  loadTrack(playerState.currentTrackId);

  if (playerState.isPlaying) {
    audioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }
}

// Play next track
function playNextTrack() {
  const currentIndex = playerState.queue.indexOf(playerState.currentTrackId);
  if (currentIndex < playerState.queue.length - 1) {
    playerState.currentTrackId = playerState.queue[currentIndex + 1];
  } else {
    // Wrap around to the beginning if at the end
    playerState.currentTrackId = playerState.queue[0];
  }

  loadTrack(playerState.currentTrackId);

  if (playerState.isPlaying) {
    audioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }
}

// Toggle shuffle mode
function toggleShuffle() {
  playerState.shuffle = !playerState.shuffle;
  loadCurrentPlaylist(); // Reload the queue with/without shuffle
  updatePlayerUI();
}

// Toggle repeat mode
function toggleRepeat() {
  if (playerState.repeat === "off") {
    playerState.repeat = "all";
  } else if (playerState.repeat === "all") {
    playerState.repeat = "one";
  } else {
    playerState.repeat = "off";
  }
  updatePlayerUI();
}

// Seek to position in track
function seekTrack(e) {
  if (!audioElement) return;

  const rect = elements.progressBar.getBoundingClientRect();
  const clickPosition = (e.clientX - rect.left) / rect.width;

  // Calculate the new time based on the click position
  const newTime = Math.floor(clickPosition * audioElement.duration);

  // Update the audio element's current time
  audioElement.currentTime = newTime;

  // Update the player state
  playerState.currentTime = newTime;

  // Update the UI
  updateProgressBar();
}

// Change volume
function changeVolume(e) {
  if (!audioElement) return;

  const rect = elements.volumeBar.getBoundingClientRect();
  const clickPosition = (e.clientX - rect.left) / rect.width;

  playerState.volume = Math.floor(clickPosition * 100);

  // Update audio element volume
  audioElement.volume = playerState.volume / 100;

  updateVolumeBar();
}

// Toggle like for the current track
function toggleLike() {
  // In a real implementation, this would save the liked status
  elements.likeButton.classList.toggle("text-spotify-green");
}

// Load a playlist
function loadPlaylist(playlistId, andPlay = false) {
  playerState.currentPlaylistId = playlistId;
  loadCurrentPlaylist();

  if (andPlay) {
    playerState.currentTrackId = playerState.queue[0];
    playerState.isPlaying = true;
    loadTrack(playerState.currentTrackId);
  }

  updatePlayerUI();
  renderPlaylistContent(playlistId);
}

// Load the current playlist into the queue
function loadCurrentPlaylist() {
  const playlist = playlists.find(
    (p) => p.id === playerState.currentPlaylistId
  );

  if (playlist) {
    playerState.queue = [...playlist.tracks]; // Copy the tracks array

    // Shuffle the queue if shuffle is enabled
    if (playerState.shuffle) {
      playerState.queue = shuffleArray([...playerState.queue]);
    }
  }
}

// Shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Format seconds as mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Update player UI to match current state
function updatePlayerUI() {
  // Update play/pause button
  if (elements.playButton) {
    const playIcon = elements.playButton.querySelector("[data-lucide]");
    if (playIcon) {
      playIcon.setAttribute(
        "data-lucide",
        playerState.isPlaying ? "pause" : "play"
      );
      // Re-render the icon
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }

  // Update shuffle button
  if (elements.shuffleButton) {
    elements.shuffleButton.classList.toggle(
      "text-brand-color",
      playerState.shuffle
    );
  }

  // Update repeat button
  if (elements.repeatButton) {
    elements.repeatButton.classList.remove("text-brand-color");
    elements.repeatButton.classList.remove("text-brand-color/70");

    if (playerState.repeat === "all") {
      elements.repeatButton.classList.add("text-brand-color");
    } else if (playerState.repeat === "one") {
      elements.repeatButton.classList.add("text-brand-color");
      // In a more complete implementation, we would change the icon to repeat-1
    }
  }

  // Update progress and volume bars
  updateProgressBar();
  updateVolumeBar();
}

// Update progress bar
function updateProgressBar() {
  if (
    !elements.progressBar ||
    !elements.progressFill ||
    !elements.progressHandle ||
    !elements.currentTimeEl
  ) {
    return;
  }

  // Update time display
  elements.currentTimeEl.textContent = formatTime(playerState.currentTime);

  // If audio element is available, use its duration
  let duration = 100; // Default fallback
  if (audioElement && audioElement.duration) {
    duration = audioElement.duration;
  } else {
    // If not, try to get the duration from the track data
    const currentTrack = tracks.find(
      (track) => track.id === playerState.currentTrackId
    );
    if (currentTrack) {
      duration = currentTrack.duration;
    }
  }

  // Calculate percentage
  const percentage = (playerState.currentTime / duration) * 100;

  // Update progress bar fill
  elements.progressFill.style.width = `${percentage}%`;

  // Update progress handle position
  elements.progressHandle.style.left = `${percentage}%`;
}

// Update volume bar
function updateVolumeBar() {
  if (!elements.volumeFill || !elements.volumeHandle) {
    return;
  }

  // Update volume bar fill
  elements.volumeFill.style.width = `${playerState.volume}%`;

  // Update volume handle position
  elements.volumeHandle.style.left = `${playerState.volume}%`;
}

// Start a timer to update the progress bar
function startProgressTimer() {
  // No need for our own timer since we're using the timeupdate event on the audio element
}

// Render playlist content
function renderPlaylistContent(playlistId) {
  // This would normally fetch and display the playlist content
  // For demonstration purposes, this is simplified
  console.log(`Rendering playlist: ${playlistId}`);
}

// Initialize the player when the page is loaded
document.addEventListener("DOMContentLoaded", initPlayer);
