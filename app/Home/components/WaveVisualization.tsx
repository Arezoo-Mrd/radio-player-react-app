import React, { useEffect, useState } from "react";

type WaveVisualizationProps = {
 isPlaying: boolean;
};

const WaveVisualization = ({ isPlaying }: WaveVisualizationProps) => {
 const [waveformBars] = useState(() =>
  Array.from({ length: 75 }, () => Math.random() * 60 + 10)
 );
 const [animatedBars, setAnimatedBars] = useState(waveformBars);

 useEffect(() => {
  if (isPlaying) {
   const interval = setInterval(() => {
    setAnimatedBars((prev) => prev.map(() => Math.random() * 60 + 10));
   }, 100);
   return () => clearInterval(interval);
  }
 }, [isPlaying]);

 useEffect(() => {
  if (isPlaying) {
   setAnimatedBars(waveformBars);
  }
 }, [isPlaying]);

 return (
  <div className="xl:flex hidden items-end justify-center gap-2 h-10">
   {animatedBars.map((height, index) => (
    <div
     key={index}
     className={`bg-gradient-to-t from-[#9578ec] to-[#7B57E4]  rounded-full transition-all duration-200 ${
      isPlaying ? "opacity-100 shadow-lg " : "opacity-40"
     }`}
     style={{
      width: "4px",
      height: `${height}px`,

      animationDelay: `${index * 2}s`,
     }}
    />
   ))}
  </div>
 );
};

export default WaveVisualization;
