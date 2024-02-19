import { CONFIG } from "@/app/config";
import { TNewsResponse } from "../types";
import fsPromises from "fs/promises";
import path from "path";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();


export const dataFilePath = path.join(
  serverRuntimeConfig.PROJECT_ROOT,
  CONFIG.DATA.NEWS_DB_PATH
);

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

  // Convert the object to a JSON string
  const newsData = JSON.stringify(newsResponse);

  // Write the updated data to the JSON file
  await fsPromises.writeFile(dataFilePath, newsData);

  // Pass data to the page via props
  return newsResponse;
};

export const asyncReadNewsData = async () => {
  try {
    const jsonData = await fsPromises.readFile(dataFilePath, "utf-8");
    const objectData = JSON.parse(jsonData) as TNewsResponse;
    return objectData;
  } catch (e: any) {
    console.log(`${e.message}`);
  }
};
