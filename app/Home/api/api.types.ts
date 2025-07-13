type Channel = {
    name: string;
    slug: string;
    description: string;
    stream_address: string;
    current_playing: {
        id: number;
        title: string;
        artist: string;
        duration: number;
        cover: string;
        like: number;
        ads: boolean;
        mode: "music";
    };
};

export type AllChanelResponse = {
    app_name: string;
    app_url: string;
    app_locale: string;
    channels: Channel[];
};
