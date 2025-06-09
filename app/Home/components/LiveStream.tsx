import { useEffect, useRef, useState } from "react";
import PlayPauseBtn from "./PlayPauseBtn";
import WaveVisualization from "./WaveVisualization";

export default function LiveStreamPlayer({
 streamUrl,
 audioRef,
}: {
 streamUrl: string;
 audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
 const [isPlaying, setIsPlaying] = useState(false);

 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");

 useEffect(() => {
  if (streamUrl) {
   setIsPlaying(false);
  }
 }, [streamUrl]);

 useEffect(() => {
  if (audioRef.current && streamUrl) {
   audioRef.current.load();
   audioRef.current.play();
  }
 }, [audioRef]);

 const togglePlay = async () => {
  if (!audioRef.current) return;

  try {
   setIsLoading(true);
   setError("");

   if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
   } else {
    await audioRef.current.play();
    setIsPlaying(true);
   }
  } catch (err) {
   setError("Failed to play stream. Please check the URL or try again.");
   setIsPlaying(false);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="w-full">
   <div className="flex w-full  justify-end gap-8 items-center md:pr-[100px]">
    <WaveVisualization isPlaying={isPlaying} />
    <PlayPauseBtn
     togglePlay={togglePlay}
     isLoading={isLoading}
     isPlaying={isPlaying}
    />
   </div>

   <audio
    ref={audioRef}
    src={streamUrl}
    preload="none"
    crossOrigin="anonymous"
    onLoadStart={() => setIsLoading(true)}
    onCanPlay={() => setIsLoading(false)}
    onError={() => {
     setError("Stream unavailable or invalid URL");
     setIsPlaying(false);
     setIsLoading(false);
    }}
    onEnded={() => setIsPlaying(false)}
   />
  </div>
 );
}
