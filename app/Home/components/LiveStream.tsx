import { useEffect, useRef, useState } from "react";
import PlayPauseBtn from "./PlayPauseBtn";
import WaveVisualization from "./WaveVisualization";
import Hls from "hls.js";

export default function LiveStreamPlayer({
    streamUrl,
    audioRef,
    isPlaying,
    setIsPlaying,
}: {
    streamUrl: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // اگر Hls ساپورت میشه
        if (Hls.isSupported()) {
            const hls = new Hls({
                liveDurationInfinity: true, // باعث میشه همیشه به لایو وصل بمونه
            });
            hls.loadSource(streamUrl);
            hls.attachMedia(audio);
            hlsRef.current = hls;

            hls.on(Hls.Events.ERROR, (_, data) => {
                console.error("HLS error:", data);
                setError("Stream error. Trying to reconnect...");
            });
        }
        // برای سافاری (که خودش HLS رو ساپورت می‌کنه)
        else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
            audio.src = streamUrl;
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [streamUrl, audioRef]);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                setIsLoading(true);
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                setError("Failed to play stream");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex w-full justify-end gap-8 items-center md:pr-[100px]">
                <WaveVisualization isPlaying={isPlaying} />
                <PlayPauseBtn
                    togglePlay={togglePlay}
                    isLoading={isLoading}
                    isPlaying={isPlaying}
                />
            </div>

            <audio
                ref={audioRef}
                preload="none"
                autoPlay={false}
                playsInline
                webkit-playsinline="true"
                crossOrigin="anonymous"
            />
        </div>
    );
}
