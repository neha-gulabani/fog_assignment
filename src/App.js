import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const song = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt:
      "https://upload.wikimedia.org/wikipedia/en/0/09/The_Weeknd_-_Blinding_Lights.png",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);

    if (audio) {
      setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      return () => audio.removeEventListener("timeupdate", updateTime);
    }
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.albumArtContainer}>
        <img src={song.albumArt} alt="Album Art" style={styles.albumArt} />
      </div>
      <div style={styles.songInfo}>
        <h2 style={styles.title}>{song.title}</h2>
        <p style={styles.artist}>{song.artist}</p>
      </div>
      <audio ref={audioRef} src={song.audioSrc} />

      <div style={styles.progressBarContainer}>
        <span style={styles.time}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          style={styles.progressBar}
        />
        <span style={styles.time}>{formatTime(duration)}</span>
      </div>

      <div style={styles.controls}>
        <button style={styles.controlButton}>⏮️</button>
        <button style={styles.controlButton} onClick={togglePlayPause}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button style={styles.controlButton}>⏭️</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    color: "#fff",
    fontFamily: "Spotify Circular, Arial, sans-serif",
    height: "100vh",
    padding: "20px",
  },
  albumArtContainer: {
    width: "300px",
    height: "300px",
    marginBottom: "20px",
  },
  albumArt: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  },
  songInfo: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    margin: "5px 0",
    fontWeight: "bold",
  },
  artist: {
    fontSize: "14px",
    color: "#b3b3b3",
  },
  progressBarContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "500px",
    marginBottom: "20px",
  },
  progressBar: {
    flex: 1,
    margin: "0 10px",
    appearance: "none",
    background: "#404040",
    height: "4px",
    borderRadius: "2px",
    outline: "none",
    cursor: "pointer",
  },
  time: {
    fontSize: "12px",
    color: "#b3b3b3",
  },
  controls: {
    display: "flex",
    justifyContent: "space-around",
    width: "150px",
  },
  controlButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    transition: "color 0.2s",
  },
};

export default App;
