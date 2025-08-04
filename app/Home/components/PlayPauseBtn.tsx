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
            onClick={() => {
                togglePlay();
            }}
            className="md:w-16 md:h-16 w-11 h-11 relative  bg-primary-base  cursor-pointer rounded-full  text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <div className="w-full h-full  absolute top-0 left-0 flex items-center justify-center">
                {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                    <Pause variant="Bold" size={24} className="text-white relative z-20" color="white" />
                ) : (
                    <Play size={24} className="text-white fill-white relative z-20" color="white" />
                )}
            </div>
        </button>
    );
};

export default PlayPauseBtn;
