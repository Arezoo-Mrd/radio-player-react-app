import { Pause, Play } from "iconsax-react";

type PlayPauseBtnProps = {
 togglePlay: () => void;
 isLoading: boolean;
 isPlaying: boolean;
};

const PlayPauseBtn = ({
 togglePlay,
 isLoading,
 isPlaying,
}: PlayPauseBtnProps) => {
 return (
  <button
   onClick={togglePlay}
   className="md:w-16 md:h-16 w-8 h-8 sm:w-11 sm:h-11 bg-primary-base  cursor-pointer rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  >
   {isLoading ? (
    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
   ) : isPlaying ? (
    <Play size={24} className="text-white fill-white" color="white" />
   ) : (
    <Pause variant="Bold" size={24} className="text-white " color="white" />
   )}
  </button>
 );
};

export default PlayPauseBtn;
