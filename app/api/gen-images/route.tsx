import { ImageResponse, NextRequest } from "next/server";
import { CONFIG, IMAGE_HEIGHT, IMAGE_WIDTH } from "@/app/config";
import Card from "@/app/card";
import fsPromises from "fs/promises";
import path from "path";
import { TNewsResponse } from "../types";

const dataFilePath = path.join(process.cwd(), CONFIG.DATA.NEWS_DB_PATH);

const getNewsData = async () => {
  // Fetch data from external API
  const res = await fetch(`${CONFIG.APP.ALPHADAY_API}/items/news/`, {
    method: "GET",
    headers: {
      Version: CONFIG.APP.VERSION,
      "X-App-Id": CONFIG.APP.X_APP_ID,
      "X-App-Secret": CONFIG.APP.X_APP_SECRET,
    },
    next: { revalidate: 300 },
  });

  const newsResponse: TNewsResponse = await res.json();

  // Convert the object to a JSON string
  const newsData = JSON.stringify(newsResponse);

  // Write the updated data to the JSON file
  await fsPromises.writeFile(dataFilePath, newsData);

  // Pass data to the page via props
  return newsResponse;
};

const roboto = fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/Roboto-Medium.ttf`
).then((res) => res.arrayBuffer());

async function getResponse(req: NextRequest) {
  try {
    const revalidatedData = await getNewsData();

    //  get searchParams
    const searchParams = req.nextUrl.searchParams;
    const id: any = searchParams.get("id");
    const idAsNumber = parseInt(id);

    const selectedData = revalidatedData.results[idAsNumber];

    return new ImageResponse(
      (
        <Card
          id={idAsNumber}
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
