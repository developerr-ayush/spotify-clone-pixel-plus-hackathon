// Mock data for Spotify clone

// Playlists data
let playlists = [
  {
    id: "liked-songs",
    name: "Liked Songs",
    owner: "You",
    coverImage: "images/ab67706f00000002db51470ffe92dddd624dab8e.jpeg",
    tracks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: "discover-weekly",
    name: "Discover Weekly",
    owner: "Spotify",
    description: "Your weekly mixtape of fresh music",
    coverImage: "images/ab67616d0000b273cab73e6ac9bf4bf3c6931570.jpeg", // Ramleela poster
    tracks: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  },
  {
    id: "release-radar",
    name: "Release Radar",
    owner: "Spotify",
    description: "Catch all the latest music from artists you follow",
    coverImage: "images/ab67616d0000b273e8acd7446270164f4806f9d2.jpeg", // O Saathi poster
    tracks: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  },
  {
    id: "chill-hits",
    name: "Chill Hits",
    owner: "Spotify",
    description: "Kick back to the best new and recent chill hits",
    coverImage: "images/ab67706f00000002e863ce9df6955fed82d56257.jpeg",
    tracks: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  },
  {
    id: "rock-classics",
    name: "Rock Classics",
    owner: "Spotify",
    description:
      "Rock legends & epic songs that continue to inspire generations",
    coverImage: "images/ab67706f00000002a1b8f967c83f8a234ab92444.jpeg",
    tracks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
  },
  {
    id: "hip-hop-mix",
    name: "Hip Hop Mix",
    owner: "Spotify",
    description: "The hottest hip hop tracks right now",
    coverImage: "images/ab67706f000000026404721c1943d5069f0805f3.jpeg",
    tracks: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
  },
  {
    id: "daily-mix-1",
    name: "Daily Mix 1",
    owner: "Spotify",
    description: "Yo Yo Honey Singh, Guru Randhawa and more",
    coverImage: "images/ab67616d0000b273d2ca4ba1030b7fefd8e53464.jpeg", // Dheere Dheere poster
    tracks: [0, 50, 60, 61, 62, 63, 64, 65, 66, 67],
  },
  {
    id: "daily-mix-2",
    name: "Daily Mix 2",
    owner: "Spotify",
    description: "The latest from Bollywood blockbusters",
    coverImage: "images/ab67616d0000b27365ce8c712e4fb894bc88461b.jpeg", // Sooryavanshi/action movie poster
    tracks: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
  },
  {
    id: "daily-mix-3",
    name: "Daily Mix 3",
    owner: "Spotify",
    description: "Arijit Singh, Atif Aslam, and more",
    coverImage: "images/ab67616d0000b273d2be316742edcc853ea55141.jpeg", // Fanaa movie poster
    tracks: [1, 2, 3, 6, 8, 9, 10, 80, 81, 82],
  },
  {
    id: "todays-top-hits",
    name: "Today's Top Hits",
    owner: "Spotify",
    description: "The biggest hits in India right now",
    coverImage: "images/ab67616d0000b273ad204486839062991becfbc9.jpeg", // YJHD poster
    tracks: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
  },
  {
    id: "rapcaviar",
    name: "RapCaviar",
    owner: "Spotify",
    description: "Best of Indian hip-hop and rap scene",
    coverImage: "images/ab67616d0000b27303966171b7ddc6f13a35d75c.jpeg", // Punjabi/rap poster
    tracks: [50, 60, 100, 101, 102, 103, 104, 105, 106, 107],
  },
  {
    id: "all-out-2010s",
    name: "All Out 2010s",
    owner: "Spotify",
    description: "The biggest Bollywood hits of the 2010s",
    coverImage: "images/ab67616d0000b27308ec59b2157bff530072c42c.jpeg", // Vintage Bollywood poster
    tracks: [1, 2, 3, 7, 8, 9, 110, 111, 112, 113],
  },
];

// Tracks data for Bollywood/Indian music
const tracks = [
  {
    id: 0,
    title: "Dheeere Dheere",
    artist: "Yo Yo Honey Singh",
    album: "Dheere Dheere",
    duration: 230,
    coverImage: "images/ab67616d0000b273d2ca4ba1030b7fefd8e53464.jpeg",
  },
  {
    id: 1,
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    album: "Aashiqui 2",
    duration: 243,
    coverImage: "images/ab67616d0000b273cab73e6ac9bf4bf3c6931570.jpeg",
  },
  {
    id: 2,
    title: "Raabta",
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 215,
    coverImage: "images/ab67616d0000b273ad204486839062991becfbc9.jpeg",
  },
  {
    id: 3,
    title: "Channa Mereya",
    artist: "Arijit Singh",
    album: "Ae Dil Hai Mushkil",
    duration: 260,
    coverImage: "images/ab67616d0000b2737881b6fe1d303657f9d409eb.jpeg",
  },
  {
    id: 4,
    title: "Dilbar",
    artist: "Neha Kakkar",
    album: "Satyameva Jayate",
    duration: 198,
    coverImage: "images/ab67616d0000b27308ec59b2157bff530072c42c.jpeg",
  },
  {
    id: 5,
    title: "Agar Tum Saath Ho",
    artist: "Arijit Singh, Alka Yagnik",
    album: "Tamasha",
    duration: 341,
    coverImage: "images/ab67616d0000b273e8acd7446270164f4806f9d2.jpeg",
  },
  {
    id: 6,
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    duration: 242,
    coverImage: "images/ab67616d0000b2733b7ae221866b5e81daf4483f.jpeg",
  },
  {
    id: 7,
    title: "Badtameez Dil",
    artist: "Benny Dayal",
    album: "Yeh Jawaani Hai Deewani",
    duration: 228,
    coverImage: "images/ab67616d0000b27303966171b7ddc6f13a35d75c.jpeg",
  },
  {
    id: 8,
    title: "Tera Ban Jaunga",
    artist: "Akhil Sachdeva, Tulsi Kumar",
    album: "Kabir Singh",
    duration: 213,
    coverImage: "images/ab67616d0000b273d2be316742edcc853ea55141.jpeg",
  },
  {
    id: 9,
    title: "O Saathi",
    artist: "Atif Aslam",
    album: "Baaghi 2",
    duration: 269,
    coverImage: "images/ab67616d0000b27365ce8c712e4fb894bc88461b.jpeg",
  },
  {
    id: 10,
    title: "Kalank Title Track",
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 295,
    coverImage: "images/ab67616d0000b273ad204486839062991becfbc9.jpeg",
  },
  // More tracks would go here...
  {
    id: 50,
    title: "Desi Kalakaar",
    artist: "Yo Yo Honey Singh",
    album: "Desi Kalakaar",
    duration: 312,
    coverImage: "images/ab67616d0000b273d2ca4ba1030b7fefd8e53464.jpeg",
  },
  {
    id: 60,
    title: "Suit Suit",
    artist: "Guru Randhawa",
    album: "Hindi Medium",
    duration: 198,
    coverImage: "images/ab67616d0000b273d2ca4ba1030b7fefd8e53464.jpeg",
  },
  {
    id: 70,
    title: "Dekhte Dekhte",
    artist: "Atif Aslam",
    album: "Batti Gul Meter Chalu",
    duration: 218,
    coverImage: "images/ab67616d0000b27365ce8c712e4fb894bc88461b.jpeg",
  },
  {
    id: 80,
    title: "Tujhe Kitna Chahne Lage",
    artist: "Arijit Singh",
    album: "Kabir Singh",
    duration: 242,
    coverImage: "images/ab67616d0000b273d2be316742edcc853ea55141.jpeg",
  },
  {
    id: 90,
    title: "Shayad",
    artist: "Arijit Singh",
    album: "Love Aaj Kal",
    duration: 233,
    coverImage: "images/ab67616d0000b273ad204486839062991becfbc9.jpeg",
  },
  {
    id: 100,
    title: "Ghungroo",
    artist: "Arijit Singh, Shilpa Rao",
    album: "War",
    duration: 208,
    coverImage: "images/ab67616d0000b27303966171b7ddc6f13a35d75c.jpeg",
  },
  {
    id: 110,
    title: "Bekhayali",
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 270,
    coverImage: "images/ab67616d0000b27308ec59b2157bff530072c42c.jpeg",
  },
];

// Categories for browse
const categories = [
  { id: "bollywood", name: "Bollywood", color: "bg-pink-600" },
  { id: "punjabi", name: "Punjabi", color: "bg-green-600" },
  { id: "indie", name: "Indie", color: "bg-purple-600" },
  { id: "romance", name: "Romance", color: "bg-red-600" },
  { id: "party", name: "Party", color: "bg-orange-600" },
  { id: "devotional", name: "Devotional", color: "bg-blue-600" },
  { id: "classical", name: "Classical", color: "bg-green-800" },
  { id: "mood", name: "Mood", color: "bg-blue-800" },
];

// User data
const userData = {
  isLoggedIn: false,
  name: "Guest",
  recentlyPlayed: [90, 50, 110, 80, 60],
  topPlaylists: [
    "liked-songs",
    "discover-weekly",
    "daily-mix-1",
    "chill-hits",
    "rock-classics",
    "hip-hop-mix",
  ],
};
