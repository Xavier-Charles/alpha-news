export const NEXT_PUBLIC_URL = "https://alphaday-news.vercel.app";
export const IMAGE_WIDTH = 800;
export const IMAGE_HEIGHT = 800;
export const CONFIG = {
  POSTS: {
    LIMIT: 10,
  },
  DATA: {
    NEWS_DB_PATH: "/app/data/news.json",
  },
  APP: {
    ALPHADAY_API: process.env.NEXT_ALPHADAY_API || "",
    VERSION: process.env.NEXT_VERSION || "",
    X_APP_ID: process.env.NEXT_X_APP_ID || "",
    X_APP_SECRET: process.env.NEXT_X_APP_SECRET || "",
  }
};