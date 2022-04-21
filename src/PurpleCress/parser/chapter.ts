import type { CheerioAPI } from "cheerio";
import type { ChapterDetails } from "paperback-extensions-common";

export function parseChapterDetails(
  $: CheerioAPI,
  mangaId: string,
  chapterId: string,
): ChapterDetails {
  console.log(`[parseChapterDetails] start`);
  const pages: string[] = [];

  $("img.page__img").map((i, page) => {
    pages.push($(page).attr("src") || "");
  });

  const info = {
    mangaId,
    id: chapterId,
    pages,
    longStrip: false,
  };
  console.log(`[parseChapterDetails] info: ${JSON.stringify(info)}`);

  console.log(`[parseChapterDetails] returning result`);
  return createChapterDetails(info);
}
