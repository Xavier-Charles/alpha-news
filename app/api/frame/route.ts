import { CONFIG } from "@/app/config";
import {
  getFrameHtmlResponse,
  FrameButtonMetadata,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { TNewsItem } from "../types";
import { getNewsData } from "../utils/getNews";

async function getResponse(
  req: NextRequest,
  newsData: TNewsItem[] | undefined
): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const id: any = searchParams.get("id");
  const idAsNumber = parseInt(id);

  const selectedData = newsData?.[idAsNumber];  

  const nextId = idAsNumber + 1;

  const buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] | undefined = [
    {
      action: "link",
      label: "Alphaday.com",
      target: CONFIG.ALPHADAY,
    },
    // {
    //   label:
    //     idAsNumber === CONFIG.POSTS.LIMIT ? `More at Alphaday.com` : `Next`,
    //   ...(idAsNumber === CONFIG.POSTS.LIMIT
    //     ? { action: "post_redirect" }
    //     : {}),
    // },
  ];

  if (selectedData) {
    buttons.unshift({
      action: "link",
      label: "Read source",
      target: selectedData.url,
    });
  }

  if (idAsNumber !== CONFIG.POSTS.LIMIT) {
    buttons.push({
      label: "Next",
    });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons,
      image: {
        src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/gen-images?id=${id}&news_id=${selectedData?.id}`,
      },
      postUrl:
        idAsNumber === CONFIG.POSTS.LIMIT
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/end`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${nextId}`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  const revalidatedData = await getNewsData();

  return getResponse(req, revalidatedData.results);
}

export const dynamic = "force-dynamic";
