import { useMemo } from "react";

function getAudioPlayFunction(audioSource) {
    const audioPlayer = new Audio(audioSource)

    return () => {
        audioPlayer.currentTime = 0;
        audioPlayer.play().catch(error => {
            console.error("Playback failed:", error);
        });
    }
}

export default function useAudioPlayer(audioSource) {
    return useMemo(() => getAudioPlayFunction(audioSource), [audioSource])
}