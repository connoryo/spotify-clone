"use client";

import useGetSongById from "@/hooks/use-get-song-by-id";
import useLoadSongUrl from "@/hooks/use-load-song-url";
import usePlayer from "@/hooks/use-player";

import PlayerContent from "./player-content";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
            <PlayerContent
                key={songUrl} // use key here since when key changes, the entire element is re-rendered (i.e. when skipping song)
                song={song}
                songUrl={songUrl}
            />
        </div>
    );
}
 
export default Player;