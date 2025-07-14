import { fetchInstance } from "~/libs/fetchInstance";
import { ALL_CHANEL, LIKE_MUSIC } from "./constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AllChanelResponse } from "./api.types";
import queryClient from "~/libs/react-query";

const getAllChanel = async () => {

    const response = await fetchInstance<AllChanelResponse>({
        path: ALL_CHANEL,
        options: {
            method: "GET",
        },
    });
    return response;
};


const postLike = async (data: { music_id: number }) => {
    const response = await fetchInstance<AllChanelResponse>({
        path: LIKE_MUSIC,
        options: {
            method: "POST",
            body: JSON.stringify(data)
        },
    });
    return response;
}

export const useGetAllChanelQuery = () => {
    return useQuery({
        queryKey: ["all-chanel"],
        queryFn: getAllChanel,
        select: (data) => {
            if (data) {
                const channels = data.channels.map((channel) => {
                    return {
                        ...channel,
                        stream_address: `${import.meta.env.VITE_STREAM_BASE_URL}${channel.stream_address
                            }`,
                    };
                });
                return {
                    ...data,
                    channels,
                };
            }
            return data;
        },
        refetchInterval: 5 * 1000
    });
};


export const useLikeMusicMutation = () => {
    return useMutation({
        mutationFn: postLike,
        mutationKey: ["like-music"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-chanel"] });
        }
    })
}