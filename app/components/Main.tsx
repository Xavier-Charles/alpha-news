import { FC } from "react";
import { TNewsItem } from "../api/types";
import { NEXT_PUBLIC_URL } from "../config";
import News from "./News";

const Main: FC<{ news: TNewsItem[] }> = ({ news }) => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 min-h-screen">
      <div
        className="absolute left-0 top-0 -z-10 transform-gpu blur-3xl sm:left-0 xl:left-0"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] -z-10 w-[59.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
        i
      </div>
      <div
        className="absolute left-0 -bottom-20 -z-10 transform-gpu blur-3xl sm:left-0 xl:left-0"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] -z-10 w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
        i
      </div>
      {/* <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_bottom_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg> */}
      <img
        // className="absolute inset-0 w-full h-full object-cover"
        className="absolute mx-auto inset-0 -z-10 lg:-top-20 -top-10 h-40 lg:h-96 [mask-image:radial-gradient(400%_400%_at_top_right,white,transparent)]"
        src={`${NEXT_PUBLIC_URL}/images/alphaday-news-transparent.png`}
        alt="logo"
      />
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <div className="mx-auto z-10 py-16 max-w-7xl px-6 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <News news={news} />
      </div>
    </div>
  );
};

export default Main;
