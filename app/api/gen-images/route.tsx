import { ImageResponse, NextRequest } from "next/server";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "@/app/config";
import Card from "@/app/card";
import { getNewsData } from "../utils/getNews";

const roboto = fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/Roboto-Medium.ttf`
).then((res) => res.arrayBuffer());

async function getResponse(req: NextRequest) {
  try {
    const revalidatedData = await getNewsData();

    console.log("revalidatedData", revalidatedData.results[1].title);
    

    //  get searchParams
    const searchParams = req.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    const idAsNumber = parseInt(id);

    const selectedData = revalidatedData?.results[idAsNumber];

    return new ImageResponse(
      (
        <Card
          id={idAsNumber}
          title={selectedData?.title|| ""}
          sourceName={selectedData?.source.name || ""}
          sourceIcon={selectedData?.source.icon || ""}
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
