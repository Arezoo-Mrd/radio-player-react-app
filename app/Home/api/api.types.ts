type Channel = {
 name: string;
 slug: string;
 description: string;
 stream_address: string;
};

export type AllChanelResponse = {
 app_name: string;
 app_url: string;
 app_locale: string;
 channels: Channel[];
};
