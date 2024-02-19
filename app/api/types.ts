export type TNewsItem = {
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
  published_at: string;
};

export type TNewsResponse = {
  results: TNewsItem[];
};
