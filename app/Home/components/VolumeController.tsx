import {
    VolumeCross,
    VolumeLow,
    // VolumeMedium,
    VolumeHigh,
    VolumeSlash,
    VolumeLow1,
} from "iconsax-react";
import { useMemo } from "react";

type VolumeControllerProps = {
    toggleMute: () => void;
    handleVolumeChange: (newVolume: number) => void;
    volume: number;
    isMuted: boolean;
};

const VolumeController = ({
    toggleMute,
    handleVolumeChange,
    volume,
    isMuted,
}: VolumeControllerProps) => {


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        let newVolume;
        if (volume === 0) {
            newVolume = 20;
        } else if (volume === 20) {
            newVolume = 50;
        } else if (volume === 50) {
            newVolume = 100;
        } else {
            newVolume = 0;
        }

        handleVolumeChange(newVolume);
    };

    console.log('volume', volume)

    const renderVolumeIcon = useMemo(() => {
        if (volume === 0) return <VolumeCross variant="Bold" size={30} color="#3A3A3A" />;
        if (volume <= 30) return <VolumeLow variant="Bold" size={30} color="#3A3A3A" />;
        if (volume <= 50) return <VolumeLow1 variant="Bold" size={30} color="#3A3A3A" />;
        if (volume <= 100) return <VolumeHigh variant="Bold" size={30} color="#3A3A3A" />;
        return <VolumeHigh variant="Bold" size={24} color="#3A3A3A" />;
    }, [volume])



    return (
        <div className="flex items-center justify-center w-fit h-fit">
            <button onClick={(e) => handleClick(e)} className="cursor-pointer w-fit h-fit">
                {renderVolumeIcon}
            </button>
        </div>
    );
};

export default VolumeController;
