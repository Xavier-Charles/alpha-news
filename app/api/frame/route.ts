import { CONFIG } from "@/app/config";
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
  FrameButtonMetadata,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fsPromises from "fs/promises";
import { TNewsResponse } from "../types";

const dataFilePath = path.join(process.cwd(), CONFIG.DATA.NEWS_DB_PATH);

async function getResponse(
  req: NextRequest,
  objectData: TNewsResponse | undefined
): Promise<NextResponse> {
  let accountAddress: string | undefined = "";
  let text: string | undefined = "";

  const searchParams = req.nextUrl.searchParams;
  const id: any = searchParams.get("id");
  const idAsNumber = parseInt(id);

  const nextId = idAsNumber + 1;

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    text = message.input;
  }

  const buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] | undefined = [
    {
      label: "More at Alphaday.com",
      action: "post_redirect",
    },
    // {
    //   label:
    //     idAsNumber === CONFIG.POSTS.LIMIT ? `More at Alphaday.com` : `Next`,
    //   ...(idAsNumber === CONFIG.POSTS.LIMIT
    //     ? { action: "post_redirect" }
    //     : {}),
    // },
  ];

  if (objectData) {
    const selectedData = objectData.results[idAsNumber];
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
        src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/gen-images?id=${id}`,
      },
      postUrl:
        idAsNumber === CONFIG.POSTS.LIMIT
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/end`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${nextId}`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  // Read the existing data from the JSON file
  const jsonData = await fsPromises.readFile(dataFilePath);
  const objectData = JSON.parse(jsonData.toString()) as TNewsResponse | undefined;
  return getResponse(req, objectData);
}

export const dynamic = "force-dynamic";
