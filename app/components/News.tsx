import { FC } from "react";
import { TNewsItem } from "../api/types";
import moment from "moment";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { CONFIG } from "../config";

const roboto = Montserrat({
  weight: "500",
  subsets: ["latin"],
});

export const computeDuration = (date: string | Date): string => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s", // this shouldn't occur If it does there's an error.
      past: "%s ago",
      s: "%ds",
      m: "%dm",
      mm: "%dm",
      h: "%dh",
      hh: "%dh",
      d: "%dd",
      dd: "%dd",
      M: "%dmo",
      MM: "%dmo",
      y: "%dy",
      yy: "%dy",
    },
  });

  return String(moment.duration(moment(date).diff(moment())).humanize(true));
};

const News: FC<{ news: TNewsItem[] }> = ({ news }) => {
  return (
    <div className="flex items-center flex-col w-full">
      <ul
        role="list"
        className={`divide-y divide-white/10 max-w-[700px] mx-4 sm:mx-auto ${roboto.className}`}
      >
        {news.slice(0, 10).map((person) => (
          <Link
            href={person.url}
            target="_blank"
            key={person.id}
            className="flex justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-[#3b3a3a]"
                src={person.source.icon}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="sm:text-base text-sm sm:font-normal font-semibold  leading-6 text-white">
                  {person.title}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                  {person.source.name}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-white h-4"></p>
              <p className="mt-1 text-xs leading-5 text-gray-400">
                {computeDuration(person.published_at)}
              </p>
            </div>
          </Link>
        ))}
      </ul>
      <div className="mt-10">
        <Link
          href={CONFIG.ALPHADAY}
          type="submit"
          className="flex w-full justify-center rounded-md bg-white/55 hover:bg-[#faa202]/70 shadow-lg bg-clip-padding px-12 py-3 text-sm sm:text-base font-semibold leading-6 text-[#121212] backdrop-blur-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-none cursor-pointer"
        >
          News and more at Alphaday.com
        </Link>
      </div>
    </div>
  );
};

export default News;
