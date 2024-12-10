import { BgOption } from "../state/model";

const URLS = {
  "unsplash-wallpapers": "https://worker.telescope.jimmyd.dev/unsplash/wallpapers",
  "unsplash-animals": "https://worker.telescope.jimmyd.dev/unsplash/animals",
  "unsplash-nature": "https://worker.telescope.jimmyd.dev/unsplash/nature",
  "unsplash-travel": "https://worker.telescope.jimmyd.dev/unsplash/travel",
};

export const getBgUrl = async (option: BgOption | null) => {
  if (option === null || option === "url") {
    return "";
  }

  // Ok and now to handle Unsplash, there is a proxy service for this so hit it, get the URL and return.
  // TODO: We should attribute back, no requirement but there's no harm in doing it.
  const apiResponse = await fetch(URLS[option]);
  if (!apiResponse.ok) {
    throw new Error(`Failed to fetch Unsplash wallpaper. Got ${apiResponse.status}`);
  }

  const unsplashBody = await apiResponse.json()

  return unsplashBody.urls.full
};
