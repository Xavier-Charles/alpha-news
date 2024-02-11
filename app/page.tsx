import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "See what's happening today in crypto!",
    },
    // {
    //   action: "link",
    //   label: "Link to Google",
    //   target: "https://www.google.com",
    // },
    // {
    //   label: "Redirect to pictures",
    //   action: "post_redirect",
    // },
  ],
  image: {
    src: `${process.env.NEXT_PUBLIC_BASE_URL}/images/alphaday-news.png`,
    aspectRatio: "1:1",
  },
  // input: {
  //   text: "Tell me a boat story",
  // },
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

export default function Page() {
  return (
    <>
      <h1 className="text-violet-300">Alpha News</h1>
    </>
  );
}
