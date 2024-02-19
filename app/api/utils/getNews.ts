import { CONFIG } from "@/app/config";
import { TNewsResponse } from "../types";

export const getNewsData = async () => {
  // Fetch data from external API
  const res = await fetch(`${CONFIG.APP.ALPHADAY_API}/items/news/`, {
    method: "GET",
    headers: {
      Version: CONFIG.APP.VERSION,
      "X-App-Id": CONFIG.APP.X_APP_ID,
      "X-App-Secret": CONFIG.APP.X_APP_SECRET,
    },
    next: { revalidate: 300 },
  });

  const newsResponse: TNewsResponse = await res.json();

  // Pass data to the page via props
  return newsResponse;
};
