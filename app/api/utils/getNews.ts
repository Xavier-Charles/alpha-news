import { CONFIG } from "@/app/config";
import { TNewsItem, TNewsResponse } from "../types";
// import fsPromises from "fs/promises";
import path from "path";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import jsCookie from "js-cookie";
// import jsHttpCookie from "cookie";

// const { serverRuntimeConfig } = getConfig();


// export const dataFilePath = path.join(
//   serverRuntimeConfig.PROJECT_ROOT,
//   CONFIG.DATA.NEWS_DB_PATH
// );

// export const dataFilePath = path.resolve("./app/data/news.json");

export const getNewsData = async () => {
  // Fetch data from external API
  const res = await fetch(`${CONFIG.APP.ALPHADAY_API}/items/news/`, {
    method: "GET",
    headers: {
      Version: CONFIG.APP.VERSION,
      "X-App-Id": CONFIG.APP.X_APP_ID,
      "X-App-Secret": CONFIG.APP.X_APP_SECRET,
    },
    next: { revalidate: 300, tags: ["news-img", "news-text"]},
  });

  const newsResponse: TNewsResponse = await res.json();

  //  jsCookie.set("news", JSON.stringify(newsResponse))

  // // Convert the object to a JSON string
  // const newsData = JSON.stringify(newsResponse);

  // // Write the updated data to the JSON file
  // await fsPromises.writeFile(dataFilePath, newsData);

  // Pass data to the page via props
  return newsResponse;
};

export const getNewsItem = async (id:number) => {
  // Fetch data from external API
  const res = await fetch(`${CONFIG.APP.ALPHADAY_API}/items/news/${id}/`, {
    method: "GET",
    headers: {
      Version: CONFIG.APP.VERSION,
      "X-App-Id": CONFIG.APP.X_APP_ID,
      "X-App-Secret": CONFIG.APP.X_APP_SECRET,
    },
    next: { revalidate: 300, tags: ["news-img", "news-text"] },
  });

  const newsItemResponse: TNewsItem = await res.json();

  return newsItemResponse;
};

// export const asyncReadNewsData = async () => {
//   try {
//     const cookiesJSON = jsCookie.get("news");
//     console.log("cookiesJSON", cookiesJSON)
//     // const jsonData = await fsPromises.readFile(dataFilePath, "utf-8");
//     const objectData = JSON.parse(cookiesJSON || "{}") as TNewsResponse;
//     return objectData;
//   } catch (e: any) {
//     console.log(`${e.message}`);
//   }
// };

type Repo = {
  name: string;
  stargazers_count: number;
};
