import { BgOption } from "../state/model";

const URLS = {
  "unsplash-wallpapers": "https://worker.telescope.jimmyd.dev/unsplash/wallpapers",
  "unsplash-animals": "https://worker.telescope.jimmyd.dev/unsplash/animals",
  "unsplash-nature": "https://worker.telescope.jimmyd.dev/unsplash/nature",
  "unsplash-travel": "https://worker.telescope.jimmyd.dev/unsplash/travel",
};

export interface BackgroundInfo {
  bgUrl: string;
  linkUrl: string;
  author: string;
  authorLink: string;
  blurHash?: string;
}

export const getBgUrl = async (
  option: BgOption | null
): Promise<BackgroundInfo | undefined> => {
  if (option === null || option === "url") {
    return undefined;
  }

  // Get unsplash details from the API proxy, and return useful info.
  const apiResponse = await fetch(URLS[option]);
  if (!apiResponse.ok) {
    throw new Error(
      `Failed to fetch Unsplash wallpaper. Got ${apiResponse.status}`
    );
  }

  const unsplashBody = await apiResponse.json();

  return {
    bgUrl: unsplashBody.urls.raw,
    linkUrl: unsplashBody.links.html,
    author: unsplashBody.user.name,
    authorLink: unsplashBody.user.links.html,
    blurHash: unsplashBody.blur_hash,
  };
};
