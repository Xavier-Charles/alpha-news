import { ImageResponse, NextRequest } from "next/server";
import { CONFIG, IMAGE_HEIGHT, IMAGE_WIDTH } from "@/app/config";
import Card from "@/app/card";

type TNewsItem = {
  id: number;
  title: string;
  url: string;
  sourceIcon: string;
  sourceSlug: string;
  sourceName: string;
  source: {
    name: string;
    icon: string;
    slug: string;
  };
  bookmarked: boolean;
  author: string;
  publishedAt: string;
};

type TResponse = {
  results: TNewsItem[];
};

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
  const newsResponse: TResponse = await res.json();
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

    console.log("selectedData", selectedData, idAsNumber);

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
