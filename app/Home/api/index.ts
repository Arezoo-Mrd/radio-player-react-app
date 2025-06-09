import { fetchInstance } from "~/libs/fetchInstance";
import { ALL_CHANEL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import type { AllChanelResponse } from "./api.types";

const getAllChanel = async () => {
 const response = await fetchInstance<AllChanelResponse>({
  path: ALL_CHANEL,
  options: {
   method: "GET",
  },
 });
 return response;
};

export const useGetAllChanelQuery = () => {
 return useQuery({
  queryKey: ["all-chanel"],
  queryFn: getAllChanel,
  select: (data) => {
   if (data) {
    const channels = data.channels.map((channel) => {
     return {
      ...channel,
      stream_address: `${import.meta.env.VITE_STREAM_BASE_URL}${
       channel.stream_address
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
 });
};
