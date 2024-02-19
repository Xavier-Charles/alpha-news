import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import Carousel from "./components/Carousel";
import { getNewsData } from "./api/utils/getNews";
import News from "./components/News";
import "./globals.css";
import Main from "./components/Main";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "See what's happening today in crypto!",
    },
  ],
  image: {
    src: `${process.env.NEXT_PUBLIC_BASE_URL}/images/alphaday-news.png`,
    aspectRatio: "1:1",
  },
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: "Alpha News",
  description: "Get the latest news on crypto right here in Alpha News.",
  openGraph: {
    title: "Alpha News",
    description: "Get the latest news on crypto right here in Alpha News.",
    images: [
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/Qme4FXhoxHHfyzTfRxSpASbMF8kajLEPkRQWhwWu9pkUjm/0.png`,
    ],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  const newsResponse = await getNewsData();
  return (
    <>
      <Main news={newsResponse.results} />
    </>
  );
}
