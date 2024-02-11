import satori from "satori";
import { ImageResponse, NextRequest } from "next/server";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "@/app/config";
import Card from "@/app/card";
import { svgToPngURL } from "@/app/svgUtils";
import { mockData } from "../mock-data";

const roboto = fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/Roboto-Medium.ttf`
).then((res) => res.arrayBuffer());

export async function getResponse(req: NextRequest) {
  try {
    //  get searchParams
    const searchParams = req.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    const idAsNumber = parseInt(id);

    const selectedData = mockData.results[idAsNumber];

    // ?title=<title>
    // const hasTitle = searchParams.has("title");

    // ?title=<title>&BgColor="blue"
    // const hasBgColor = searchParams.has("BgColor");

    // ?title=<title>&BgColor="blue"&color="black"
    // const hasColor = searchParams.has("color");

    // add default title
    // const title = hasTitle
    //   ? searchParams.get("title")?.slice(0, 100)
    //   : "Minimal blog text";

    // add default BgColor
    // const BgColor = hasBgColor ? searchParams.get("BgColor") : "lightblue";

    // add default color
    // const Color = hasColor ? searchParams.get("color") : "black";

    return new ImageResponse(
      (
        <Card
          title={selectedData.title}
          sourceName={selectedData.source.name}
          sourceIcon={selectedData.source.icon}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        />
      ),
      {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        fonts: [
          {
            name: "Roboto",
            data: await roboto,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest): Promise<ImageResponse> {
  return getResponse(req);
}
