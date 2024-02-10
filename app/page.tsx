import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "./config";

// const frameMetadata: Metadata = getFrameMetadata({
//   buttons: [
//     {
//       label: "See what's happening",
//     },
//   ],
//   image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/Qme4FXhoxHHfyzTfRxSpASbMF8kajLEPkRQWhwWu9pkUjm/0.png`,
//   post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
// });

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "See what's happening in crypto!",
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
    src: `${NEXT_PUBLIC_URL}/images/alphaday.png`,
    aspectRatio: "1:1",
  },
  // input: {
  //   text: "Tell me a boat story",
  // },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?id=1`,
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
      <h1 className="text-blue100">Alpha News</h1>
    </>
  );
}
