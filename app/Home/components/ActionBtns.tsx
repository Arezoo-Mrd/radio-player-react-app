import React from "react";
import LiveBtn from "./LiveBtn";
import { Heart } from "iconsax-react";
import VolumeController from "./VolumeController";
import { twMerge } from "tailwind-merge";

type ActionBtnsProps = {
 toggleMute: () => void;
 handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 volume: number;
 isMuted: boolean;
 className?: string;
};

const ActionBtns = ({
 toggleMute,
 handleVolumeChange,
 volume,
 isMuted,
 className,
}: ActionBtnsProps) => {
 return (
  <div
   className={twMerge(
    "flex  w-full md:w-1/4 items-center justify-between md:justify-start   gap-4 relative z-10",
    className
   )}
  >
   <div className="w-full md:w-auto">
    <LiveBtn />
   </div>
   <div className="flex w-full gap-4 items-center justify-end md:justify-start md:w-auto">
    <Heart size={24} variant="Bold" color="#FF3A3A" />
    <VolumeController
     toggleMute={toggleMute}
     handleVolumeChange={handleVolumeChange}
     volume={volume}
     isMuted={isMuted}
    />
   </div>
  </div>
 );
};

export default ActionBtns;
