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

// Initialize the player
function initPlayer() {
  // Cache DOM elements for better performance
  cacheElements();

  // Load initial data
  loadCurrentPlaylist();

  // Set up event listeners
  setupEventListeners();

  // Update UI to match initial state
  updatePlayerUI();

  // Set a timer to update the progress bar
  startProgressTimer();
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

  // Playlists and library
  elements.playlistItems = document.querySelectorAll("[data-playlist-id]");
  elements.mainContent = document.getElementById("main-content");
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
  updatePlayerUI();
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
  playerState.currentTime = 0;
  updatePlayerUI();
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
  playerState.currentTime = 0;
  updatePlayerUI();
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
  const rect = elements.progressBar.getBoundingClientRect();
  const clickPosition = (e.clientX - rect.left) / rect.width;

  const currentTrack = tracks.find(
    (track) => track.id === playerState.currentTrackId
  );
  if (currentTrack) {
    playerState.currentTime = Math.floor(clickPosition * currentTrack.duration);
    updateProgressBar();
  }
}

// Change volume
function changeVolume(e) {
  const rect = elements.volumeBar.getBoundingClientRect();
  const clickPosition = (e.clientX - rect.left) / rect.width;

  playerState.volume = Math.floor(clickPosition * 100);
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
    playerState.currentTime = 0;
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

// Update UI to match player state
function updatePlayerUI() {
  const currentTrack = tracks.find(
    (track) => track.id === playerState.currentTrackId
  );

  if (!currentTrack) return;

  // Update track info
  if (elements.trackCover) {
    elements.trackCover.src = currentTrack.coverImage;
    elements.trackCover.alt = `${currentTrack.title} by ${currentTrack.artist}`;
  }

  if (elements.trackTitle) {
    elements.trackTitle.textContent = currentTrack.title;
  }

  if (elements.trackArtist) {
    elements.trackArtist.textContent = currentTrack.artist;
  }

  // Update play/pause button
  if (elements.playButton) {
    const icon = elements.playButton.querySelector("i");
    if (icon) {
      if (playerState.isPlaying) {
        icon.setAttribute("data-lucide", "pause");
      } else {
        icon.setAttribute("data-lucide", "play");
      }
      lucide.createIcons(); // Refresh the icon
    }
  }

  // Update shuffle button
  if (elements.shuffleButton) {
    elements.shuffleButton.classList.toggle(
      "text-spotify-green",
      playerState.shuffle
    );
  }

  // Update repeat button
  if (elements.repeatButton) {
    elements.repeatButton.classList.remove("text-spotify-green");
    if (playerState.repeat !== "off") {
      elements.repeatButton.classList.add("text-spotify-green");
    }

    const icon = elements.repeatButton.querySelector("i");
    if (icon) {
      if (playerState.repeat === "one") {
        icon.setAttribute("data-lucide", "repeat-1");
      } else {
        icon.setAttribute("data-lucide", "repeat");
      }
      lucide.createIcons(); // Refresh the icon
    }
  }

  // Update progress and time displays
  updateProgressBar();

  // Update volume display
  updateVolumeBar();
}

// Update the progress bar
function updateProgressBar() {
  const currentTrack = tracks.find(
    (track) => track.id === playerState.currentTrackId
  );

  if (!currentTrack) return;

  // Update progress bar fill
  const progressPercent =
    (playerState.currentTime / currentTrack.duration) * 100;
  if (elements.progressFill) {
    elements.progressFill.style.width = `${progressPercent}%`;
  }

  // Update progress handle position
  if (elements.progressHandle) {
    elements.progressHandle.style.left = `${progressPercent}%`;
  }

  // Update time displays
  if (elements.currentTimeEl) {
    elements.currentTimeEl.textContent = formatTime(playerState.currentTime);
  }

  if (elements.totalTimeEl) {
    elements.totalTimeEl.textContent = formatTime(currentTrack.duration);
  }
}

// Update the volume bar
function updateVolumeBar() {
  // Update volume bar fill
  if (elements.volumeFill) {
    elements.volumeFill.style.width = `${playerState.volume}%`;
  }

  // Update volume handle position
  if (elements.volumeHandle) {
    elements.volumeHandle.style.left = `${playerState.volume}%`;
  }
}

// Start a timer to update the progress
function startProgressTimer() {
  setInterval(() => {
    if (playerState.isPlaying) {
      const currentTrack = tracks.find(
        (track) => track.id === playerState.currentTrackId
      );

      if (currentTrack) {
        playerState.currentTime += 1;

        // If we've reached the end of the track
        if (playerState.currentTime >= currentTrack.duration) {
          if (playerState.repeat === "one") {
            // Repeat the same track
            playerState.currentTime = 0;
          } else {
            // Go to next track
            playNextTrack();
          }
        }

        updateProgressBar();
      }
    }
  }, 1000);
}

// Render playlist content in the main area
function renderPlaylistContent(playlistId) {
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist || !elements.mainContent) return;

  // Build the playlist header
  let html = `
    <div class="p-6">
      <div class="flex items-center gap-6 mb-6">
        <div class="h-48 w-48 overflow-hidden rounded-md shadow-lg">
          <img src="${playlist.coverImage}" alt="${
    playlist.name
  }" class="object-cover h-full w-full">
        </div>
        <div>
          <p class="text-sm text-white/70">Playlist</p>
          <h1 class="text-5xl font-bold text-white mt-2 mb-4">${
            playlist.name
          }</h1>
          <p class="text-sm text-white/70">${playlist.description || ""}</p>
          <p class="text-sm text-white/70 mt-1">Created by ${
            playlist.owner
          } • ${playlist.tracks.length} songs</p>
        </div>
      </div>
      
      <div class="flex items-center gap-4 mt-4 mb-6">
        <button class="h-14 w-14 rounded-full bg-spotify-green text-black shadow-md hover:bg-spotify-greenHover flex items-center justify-center">
          <i data-lucide="play" class="h-7 w-7 fill-current"></i>
        </button>
      </div>
      
      <table class="w-full text-left text-sm text-white/70">
        <thead class="border-b border-white/10 text-xs uppercase">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Album</th>
            <th class="px-4 py-2">Date Added</th>
            <th class="px-4 py-2 text-right">
              <i data-lucide="clock" class="h-4 w-4 inline"></i>
            </th>
          </tr>
        </thead>
        <tbody>
  `;

  // Add each track in the playlist
  playlist.tracks.forEach((trackId, index) => {
    const track = tracks.find((t) => t.id === trackId);
    if (track) {
      const isCurrentTrack = trackId === playerState.currentTrackId;
      html += `
        <tr class="group hover:bg-white/10 ${
          isCurrentTrack ? "text-spotify-green" : ""
        }" data-track-id="${trackId}">
          <td class="px-4 py-3 w-[40px]">
            <div class="relative">
              <span class="group-hover:hidden ${
                isCurrentTrack ? "hidden" : ""
              }">${index + 1}</span>
              <button class="h-4 w-4 text-white hidden ${
                isCurrentTrack ? "!block" : "group-hover:!block"
              } absolute top-0 left-0">
                <i data-lucide="${
                  isCurrentTrack && playerState.isPlaying ? "pause" : "play"
                }" class="h-4 w-4"></i>
              </button>
            </div>
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center gap-4">
              <img src="${track.coverImage}" alt="${
        track.title
      }" class="h-10 w-10 object-cover rounded">
              <div>
                <div class="text-white ${
                  isCurrentTrack ? "text-spotify-green" : ""
                }">${track.title}</div>
                <div>${track.artist}</div>
              </div>
            </div>
          </td>
          <td class="px-4 py-3">${track.album}</td>
          <td class="px-4 py-3">2 days ago</td>
          <td class="px-4 py-3 text-right">${formatTime(track.duration)}</td>
        </tr>
      `;
    }
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  elements.mainContent.innerHTML = html;

  // Initialize Lucide icons
  lucide.createIcons();

  // Add click event to play tracks
  document.querySelectorAll("tbody tr").forEach((row) => {
    row.addEventListener("click", () => {
      const trackId = parseInt(row.dataset.trackId);
      playerState.currentTrackId = trackId;
      playerState.isPlaying = true;
      playerState.currentTime = 0;
      updatePlayerUI();
    });
  });

  // Add event for the play button
  const playlistPlayButton = elements.mainContent.querySelector("button");
  if (playlistPlayButton) {
    playlistPlayButton.addEventListener("click", () => {
      playerState.currentTrackId = playlist.tracks[0];
      playerState.isPlaying = true;
      playerState.currentTime = 0;
      updatePlayerUI();
    });
  }
}

// Initialize player when the DOM is loaded
document.addEventListener("DOMContentLoaded", initPlayer);
