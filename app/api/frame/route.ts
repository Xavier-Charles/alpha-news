import { CONFIG } from "@/app/config";
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
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

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        // @ts-ignore
        isNaN(idAsNumber)
          ? {
              action: "link",
              label: "Read source",
              target: "https://www.google.com",
            }
          : {},
        {
          label:
            idAsNumber === CONFIG.POSTS.LIMIT ? `More at Alphaday.com` : `Next`,
          ...(idAsNumber === CONFIG.POSTS.LIMIT
            ? { action: "post_redirect" }
            : {}),
        },
        // @ts-ignore
        idAsNumber !== CONFIG.POSTS.LIMIT
          ? {
              label: "Next",
            }
          : {},
      ],
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
  return getResponse(req);
}

export const dynamic = "force-dynamic";
