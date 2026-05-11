import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type AudioPlayerProps = {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    title: string;
    icon: string;
};

export default function AudioPlayer({ audioRef, title, icon}: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlay() {
    const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
        audio.play();
        setIsPlaying(true);
        } else {
        audio.pause();
        setIsPlaying(false);
        }
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        function updateTime() {
        setCurrentTime(audio!.currentTime);
        }

        function updateMetadata() {
        setDuration(audio!.duration);
        }

        function updatePlayState() {
        setIsPlaying(!audio!.paused);
        }

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateMetadata);
        audio.addEventListener("play", updatePlayState);
        audio.addEventListener("pause", updatePlayState);

        setDuration(audio.duration || 0);
        setCurrentTime(audio.currentTime || 0);
        setIsPlaying(!audio.paused);

        return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateMetadata);
        audio.removeEventListener("play", updatePlayState);
        audio.removeEventListener("pause", updatePlayState);
        };
    }, [audioRef]);

    const progress = duration ? (currentTime / duration) * 100 : 0;

    function formatTime(time: number) {
        if (!time || Number.isNaN(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    return (
        <div className="audioPlayer">
            <img src={icon} alt="Music Icon" className="audioPic"/>
            
            <div className="audioDetails">
                <span className="audioTitle">{title}</span>  

                <div className="audioController">
                    <span className="audioTime">{formatTime(currentTime)}</span>
                    <div className="audioProgress">
                        <div
                            className="audioProgressFill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    
                    <span className="audioTime">{formatTime(duration)}</span>

                    <button className="audioBtn" onClick={togglePlay}> 
                        {isPlaying ? <PauseIcon size={25} weight="fill" /> :  <PlayIcon size={25} weight="fill" />}
                    </button>
                </div>
            </div>
        </div>
    );
}