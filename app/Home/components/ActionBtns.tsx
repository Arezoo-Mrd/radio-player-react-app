import React from "react";
import LiveBtn from "./LiveBtn";
import { Heart } from "iconsax-react";
import VolumeController from "./VolumeController";
import { twMerge } from "tailwind-merge";
import { useLikeMusicMutation } from "../api";

type ActionBtnsProps = {
    toggleMute: () => void;
    handleVolumeChange: (newVolume: number) => void;
    volume: number;
    isMuted: boolean;
    className?: string;
    musicId: number | undefined
    hasLike: boolean
};

const ActionBtns = ({
    toggleMute,
    handleVolumeChange,
    volume,
    isMuted,
    className,
    musicId,
    hasLike
}: ActionBtnsProps) => {
    const { mutate: likeMusicMutation, isSuccess } = useLikeMusicMutation()
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
                <Heart size={24} variant={hasLike ? "Bold" : "Linear"} className="cursor-pointer" color="#FF3A3A" onClick={() => {

                    if (musicId) {
                        console.log("musicId", musicId)
                        likeMusicMutation({
                            music_id: musicId
                        })
                    }
                }} />
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
