import styles from "./AudioPreview.module.css";
import React, { useState, useEffect, useRef } from "react";
import { PlayBtn, Range } from "../../../../../../view/ui";
import { useSelector } from "react-redux";

const AudioPreview = () => {
  const { preview } = useSelector((state) => state.preview);
  const [source, setSource] = useState(null);

  useEffect(() => {
    setSource(preview);
    return () => {
      URL.revokeObjectURL(source);
      setIsPlaying(false);
      setSource(null);
    };
  }, [preview]);

  // player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  const handlePlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying((prevState) => !prevState);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.audioPreview}>
      <audio
        ref={audioRef}
        src={source}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        loop
      />
      <PlayBtn onClick={handlePlayPause} isPlaying={isPlaying} />
      <div className={styles.panel}>
        <span className={styles.time}>{formatTime(currentTime)}</span>
        <div className={styles.progressWrap}>
          <Range
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
        </div>
        <span className={styles.time}>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPreview;
