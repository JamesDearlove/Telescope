import { BgOption } from "../state/model";

// TODO: This is patchwork as I'll need to write a real API middleware for this.
//       Source still works for now, so this should be fine.
const URLS = {
  "unsplash-city": "https://source.unsplash.com/1920x1080/daily?city",
  "unsplash-landscape": "https://source.unsplash.com/1920x1080/daily?landscape",
  "unsplash-space": "https://source.unsplash.com/1920x1080/daily?space",
  "unsplash-featured": "https://source.unsplash.com/featured/1920x1080/daily",
};

export const getBgUrl = (option: BgOption | null) => {
  if (option === null || option === "url") {
    return "";
  }

  return URLS[option];
};
