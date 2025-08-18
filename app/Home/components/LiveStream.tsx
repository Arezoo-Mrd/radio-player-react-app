import { useEffect, useRef, useState } from "react";
import PlayPauseBtn from "./PlayPauseBtn";
import WaveVisualization from "./WaveVisualization";

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
    const [streamKey, setStreamKey] = useState(0);
    const isMounted = useRef(true);


    const resetStream = () => {
        if (!audioRef.current) return;

        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
        setIsPlaying(false);


        setStreamKey(prev => prev + 1);
    };


    const startNewStream = async () => {
        if (!audioRef.current || !isMounted.current) return;

        try {
            setIsLoading(true);
            setError("");

            const newUrl = `${streamUrl}${streamUrl.includes('?') ? '&' : '?'}_=${Date.now()}`;

            audioRef.current.src = newUrl;
            audioRef.current.preload = "none";

            await new Promise((resolve, reject) => {
                if (!audioRef.current) return reject();

                const onCanPlay = () => {
                    audioRef.current?.removeEventListener('canplay', onCanPlay);
                    resolve(true);
                };

                const onError = () => {
                    audioRef.current?.removeEventListener('error', onError);
                    reject();
                };

                audioRef.current.addEventListener('canplay', onCanPlay);
                audioRef.current.addEventListener('error', onError);

                audioRef.current.load();
            });


            await audioRef.current.play();
            setIsPlaying(true);
        } catch (err) {
            setError("Failed to play stream. Please try again.");
            setIsPlaying(false);
        } finally {
            if (isMounted.current) {
                setIsLoading(false);
            }
        }
    };

    const togglePlay = async () => {
        if (isPlaying) {
            resetStream();
        } else {
            await startNewStream();
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playNewStream = async () => {
            try {
                setIsLoading(true);
                setError("");

                const newUrl = `${streamUrl}${streamUrl.includes("?") ? "&" : "?"}_=${Date.now()}`;

                // قطع پخش فعلی
                audio.pause();
                audio.src = newUrl;
                audio.load();

                await new Promise<void>((resolve, reject) => {
                    const onCanPlay = () => {
                        audio.removeEventListener("canplay", onCanPlay);
                        resolve();
                    };

                    const onError = () => {
                        audio.removeEventListener("error", onError);
                        reject();
                    };

                    audio.addEventListener("canplay", onCanPlay);
                    audio.addEventListener("error", onError);
                });

                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                setError("Failed to play stream.");
                setIsPlaying(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (isPlaying || audio.paused || audio.readyState === 0) {
            playNewStream();
        }

    }, [streamUrl]);





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
                key={`audio-${streamKey}`}
                ref={audioRef}
                preload="none"
                playsInline
                webkit-playsinline="true"
                crossOrigin="anonymous"
            />
        </div>
    );
}