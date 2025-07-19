import { useEffect, useMemo, useRef, useState } from "react";
import { convertTime } from "~/libs/convertTime";
import { useGetAllChanelQuery } from "../api";
import ActionBtns from "./ActionBtns";
import LiveStreamPlayer from "./LiveStream";
import PlayerBtn from "./PlayerBtn";

const PlayerPage = () => {
    const { data, isLoading } = useGetAllChanelQuery();
    const [selectedChannel, setSelectedChannel] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const changeChannel = (channel: number) => {
        setSelectedChannel(channel);
    };

    const currentStreamUrl = useMemo(() => {
        return data?.channels[selectedChannel]?.stream_address || "";
    }, [data, selectedChannel]);

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };


    return isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-8 border-solid border-neutral-light"></div>
        </div>
    ) : (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="flex w-full justify-center h-full items-center">
                <div className="w-[300px] h-[300px] flex flex-col items-center justify-center">
                    <div className="flex w-full items-center justify-between">
                        {data?.channels.map((channel, index) => {
                            return (
                                <button
                                    key={channel.slug}
                                    onClick={() => selectedChannel !== index && changeChannel(index)}
                                    className={`${selectedChannel === index ? "font-PeydaBold" : ""
                                        } text-headline-secondary text-lg cursor-pointer`}
                                >
                                    {channel.name}
                                </button>
                            );
                        })}
                    </div>
                    <PlayerBtn
                        selectedChannel={selectedChannel}
                        changeChannel={changeChannel}
                    />

                    <h5 className="py-7 text-headline-secondary text-lg">
                        Turn the knob to change the channel.
                    </h5>
                </div>
            </div>
            <div className="h-fit flex w-full items-end">
                <img
                    src={data?.channels[selectedChannel]?.current_playing?.cover || "/mic.png"}
                    alt="player-bg"
                    width={266}
                    height={266}
                    className=" md:w-[266px] md:h-[266px] w-[149px] h-[149px]   left-0"
                />
                <div className="h-[140px] md:h-[233px] p-3 md:p-0 flex flex-col md:block justify-between items-center   w-full relative ">
                    <img
                        src="/Noise.png"
                        alt="player-bg"
                        className="w-full h-full  absolute right-0 top-0 left-0  opacity-[0.2]"
                    />

                    <div className="absolute top-0 right-0   left-0 opacity-[0.3] backdrop-blur-[132px] w-full h-full bg-gradient-to-b from-[#F8BEFC] to-[#F8BEFCB2] to-[70%]"></div>
                    <div className="flex w-full justify-between">
                        <div className="w-full md:w-[72%] h-0.5  md:mt-5 bg-white  relative z-10"></div>
                        <div className="hidden md:block w-1/4 h-0.5 mt-5 bg-white  relative z-10"></div>
                    </div>
                    <div className="flex items-start  py-3 md:py-[29px]   justify-between w-full">
                        <div className="flex w-full md:w-[72%] flex-col  md:pl-[65px]">
                            <h6 className="text-xl sm:text-2xl truncate w-[161px]  md:w-full md:text-[44px] text-headline-base font-bold md:leading-[100%]">
                                {data?.channels[selectedChannel]?.current_playing?.title}
                            </h6>
                            <p className="text-neutral-light truncate text-sm md:text-xl">
                                {data?.channels[selectedChannel]?.current_playing?.artist}
                            </p>
                        </div>
                        <div className="w-full md:hidden relative z-10">
                            <LiveStreamPlayer audioRef={audioRef} streamUrl={currentStreamUrl} />
                        </div>
                        <ActionBtns
                            className="hidden md:flex"
                            toggleMute={toggleMute}
                            handleVolumeChange={handleVolumeChange}
                            volume={volume}
                            isMuted={isMuted}
                            hasLike={!!data?.channels[selectedChannel].current_playing?.like}
                            musicId={data?.channels[selectedChannel].current_playing?.id}
                        />
                    </div>
                    <div className="w-full hidden  md:flex items-center justify-between relative z-10">
                        <div className="pl-15">{convertTime(data?.channels[selectedChannel]?.current_playing?.duration || 0)}</div>
                        <LiveStreamPlayer audioRef={audioRef} streamUrl={currentStreamUrl} />
                    </div>
                    <ActionBtns
                        className="md:hidden"
                        toggleMute={toggleMute}
                        handleVolumeChange={handleVolumeChange}
                        volume={volume}
                        isMuted={isMuted}
                        hasLike={!!data?.channels[selectedChannel].current_playing?.like}
                        musicId={data?.channels[selectedChannel].current_playing?.id}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerPage;
