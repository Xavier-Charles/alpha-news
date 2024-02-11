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

  if (id === 10) {
    return NextResponse.redirect("https://app.alphaday.com", { status: 302 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: id === 10 ? `More news at Alphaday.com` : `Next`,
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/gen-images?id=${id}`,
      },
      postUrl:
        id === 10
          ? "https://app.alphaday.com/"
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${nextId}`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
