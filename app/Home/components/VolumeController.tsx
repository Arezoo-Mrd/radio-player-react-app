import { VolumeCross, VolumeHigh } from "iconsax-react";
import { useEffect, useState } from "react";

type VolumeControllerProps = {
 toggleMute: () => void;
 handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 volume: number;
 isMuted: boolean;
};
const VolumeController = ({
 handleVolumeChange,
 volume,
 isMuted,
}: VolumeControllerProps) => {
 const [showVolume, setShowVolume] = useState(false);
 const toggleVolume = (e: React.MouseEvent<HTMLButtonElement>) => {
  setShowVolume(!showVolume);
 };

 return (
  <div className="flex items-center justify-center w-6 h-6   relative gap-4 ">
   <button onClick={toggleVolume} className="  cursor-pointer w-fit h-fit">
    {isMuted || volume === 0 ? (
     <VolumeCross size="24" variant="Bold" color="#3A3A3A" />
    ) : (
     <VolumeHigh size="24" variant="Bold" color="#3A3A3A" />
    )}
   </button>
   <div
    className={`flex items-center absolute bottom-6 transition-all duration-150 ease-linear left-1 gap-3 ${
     showVolume ? "opacity-100" : "opacity-0"
    }`}
   >
    <input
     min={0}
     onChange={handleVolumeChange}
     max={100}
     className="appearance-none w-2 h-32 bg-primary-base/40 cursor-pointer rounded-lg slider accent-primary-base"
     style={{
      background: `linear-gradient(to top, #9578ec 0%, #390dbf ${volume}%, rgba(255,255,255,0.6) ${volume}%, rgba(0,0,0,0.2) 100%)`,
     }}
     value={volume}
     type="range"
    />
   </div>
  </div>
 );
};

export default VolumeController;
