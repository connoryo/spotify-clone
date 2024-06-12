"use client";

import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import { Song, song_file_formats } from "@/types";
import usePlayer from "@/hooks/use-player";

import MediaItem from "./media-item";
import LikeButton from "./like-button";
import Slider from "./slider";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();

    const [volume, setVolume] = useState(1);
    const [previousVolume, setPreviousVolume] = useState(1);

    const [isPlaying, setIsPlaying] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);
    const [currentScrubTime, setCurrentScrubTime] = useState(0);

    const [duration, setDuration] = useState(0);
    const [isScrubbing, setIsScrubbing] = useState(false);

    const [displayTimeRemaining, setDisplayTimeRemaining] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    };

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        
        let previousSong = undefined;
        if (currentTime >= 3) {
            pause();
            sound.seek(0);
            play();
            return;
        } else {
            previousSong = player.ids[currentIndex - 1];
        }

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    };

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: song_file_formats
        }
    );

    useEffect(() => {
        if (sound) {
            sound.play();
            setDuration(sound.duration() || 0);

            const interval = setInterval(() => {
                setCurrentTime(sound.seek() || 0);
            }, 100);

            return () => {
                clearInterval(interval);
                sound.unload();
            };
        }
    }, [sound]);

    useEffect(() => {
        if (!isScrubbing) {
            sound?.seek(currentScrubTime);
            setCurrentTime(currentScrubTime);
        }
    }, [sound, isScrubbing]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(previousVolume);
        } else {
            setPreviousVolume(volume)
            setVolume(0);
        }
    };

    const handleSeekStart = () => {
        setIsScrubbing(true);
    };

    const handleSeekEnd = (value: number) => {
        setIsScrubbing(false);
    };

    const handleSeekChange = (value: number) => {
        setCurrentScrubTime(value);
    };

    const getSeekBarValue = () => {
        if (isScrubbing) {
            return currentScrubTime;
        }
        return currentTime;
    };

    const convertTimestamp = (seconds: number) => {
        let totalSeconds = Math.floor(seconds);
        
        let hours = Math.floor(totalSeconds / (60 * 60));
        let remainingMinutes = seconds % (60 * 60);

        let minutes = Math.floor(remainingMinutes / 60);
        let remainingSeconds = totalSeconds % 60;

        let formattedHours = hours < 10 ? '0' + hours : hours;

        let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

        if (hours > 0) {
            return `${formattedHours}:${minutes}:${formattedSeconds}`;
        } else {
            return `${minutes}:${formattedSeconds}`;
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full w-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            {/* Mobile play/pause button */}
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div 
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>

            {/* Desktop play/pause UI */}
            <div className="items-center justify-center md:flex flex-col">
                <div className="hidden h-full md:flex flex-col justify-center items-center w-full max-w-[766px] gap-x-6">
                    <div className="flex items-center gap-x-6 -mt-1 mb-2">
                        <AiFillStepBackward
                            onClick={onPlayPrevious}
                            size={25}
                            className="text-neutral-400 active:!text-neutral-400 cursor-pointer hover:text-white transition"
                        />
                        <div
                            onClick={handlePlay}
                            className="flex items-center justify-center h-9 w-9 rounded-full bg-white p-1 cursor-pointer hover:scale-110 active:scale-100"
                        >
                            <Icon size={30} className="text-black" />
                        </div>
                        <AiFillStepForward
                            onClick={onPlayNext}
                            size={25}
                            className="text-neutral-400 active:!text-neutral-400 cursor-pointer hover:text-white transition"
                        />
                    </div>

                    {/* Seek bar */}
                    <div className="w-full -mt-[10px] -mb-2 flex flex-row items-center gap-x-1">
                        <span className="text-neutral-400 text-xs w-[75px] text-right select-none">{convertTimestamp(getSeekBarValue())}</span>
                        <Slider
                            value={getSeekBarValue()}
                            max={duration}
                            onChange={handleSeekChange}
                            onMouseDown={handleSeekStart}
                            onMouseUp={handleSeekEnd}
                        />
                        <span 
                            className="text-neutral-400 text-xs w-[75px] text-left cursor-pointer select-none"
                            onClick={() => setDisplayTimeRemaining(!displayTimeRemaining)}
                        >
                            {displayTimeRemaining ? '-' + convertTimestamp(duration - getSeekBarValue()) : convertTimestamp(duration)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={34}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerContent;