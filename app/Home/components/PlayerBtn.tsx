"use client";

import { useEffect, useRef } from "react";

type PlayerBtnProps = {
 selectedChannel: number;
 changeChannel: (channel: number) => void;
};

const PlayerBtn = ({ selectedChannel, changeChannel }: PlayerBtnProps) => {
 const audioContextRef = useRef<AudioContext | null>(null);

 useEffect(() => {
  // Initialize Web Audio API
  if (typeof window !== "undefined") {
   audioContextRef.current = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  }

  return () => {
   if (audioContextRef.current) {
    audioContextRef.current.close();
   }
  };
 }, []);

 const playTickSound = () => {
  if (!audioContextRef.current) return;

  const context = audioContextRef.current;
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  // Create a short tick sound
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.frequency.setValueAtTime(100, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
   10,
   context.currentTime + 0.1
  );

  gainNode.gain.setValueAtTime(0.3, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + 0.1);
 };

 const handleChannelChange = async () => {
  // Resume audio context if needed (for browser autoplay policies)
  if (audioContextRef.current?.state === "suspended") {
   await audioContextRef.current.resume();
  }

  // Play tick sound
  playTickSound();

  // Change channel
  changeChannel(selectedChannel === 0 ? 1 : 0);
 };

 return (
  <div className="w-[220px] h-[180px] flex items-center justify-center relative">
   <button
    type="button"
    onClick={handleChannelChange}
    className={`absolute bottom-0 cursor-pointer transition-all duration-300 w-fit h-fit ${
     selectedChannel === 0 ? "rotate-0" : "rotate-[90deg]"
    }`}
   >
    <img
     src="/icons/radioBtn.svg"
     alt="active-radio-btn"
     className="w-[150px] h-[150px]"
    />
    <img
     src="/icons/radioBtnActive.svg"
     alt="radio-btn"
     className="absolute left-5 rotate-[158deg] top-[40px] -translate-y-1/4 translate-x-5"
    />
   </button>
   <img src="/icons/rangbar.svg" alt="range-bar" className="w-full h-full" />
  </div>
 );
};

export default PlayerBtn;
