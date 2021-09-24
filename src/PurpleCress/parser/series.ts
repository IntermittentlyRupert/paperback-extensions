import type { Manga, Chapter } from "paperback-extensions-common";
import { MangaStatus, LanguageCode } from "paperback-extensions-common";

function getStatus($: cheerio.Root): MangaStatus {
  const status = $("series__status").text().trim().toLowerCase();
  console.log(`[getStatus] raw status: ${status}`);
  switch (status) {
    case "ongoing":
      return MangaStatus.ONGOING;
    case "dropped":
      return MangaStatus.ABANDONED;
    case "finished":
      return MangaStatus.COMPLETED;
    default:
      return MangaStatus.UNKNOWN;
  }
}

export function parseLastUpdate($: cheerio.Root): Date | undefined {
  console.log(`[parseLastUpdate] start`);

  const rawLastUpdate = $(".chapter__date").first().text().trim();
  console.log(`[parseLastUpdate] raw lastUpdate: ${rawLastUpdate}`);

  // PurpleCress use a timezone of somewhere between UTC and UTC+2:20 to
  // generate the `YYYY-mm-dd` update dates on the manga detail page (based on
  // comparison with the exact update timestamps from the `__NUXT__` data for a
  // whole bunch of chapters), so just assume it's probably UTC.
  //
  // The real update timestamp will be somewhere between `lastUpdate` and
  // `lastUpdate + 23:59:59.999`.
  const lastUpdate = new Date(rawLastUpdate);
  console.log(`[parseLastUpdate] parsed lastUpdate: ${lastUpdate}`);

  if (isNaN(lastUpdate.getTime())) {
    console.error(`[parseLastUpdate] date is not valid!`);
    return undefined;
  }

  console.log(`[parseLastUpdate] done`);
  return lastUpdate;
}

export function parseMangaDetails($: cheerio.Root, mangaId: string): Manga {
  console.log(`[parseMangaDetails] start`);

  const title = $(".series__name").text().trim();
  const image = $("img.series__img").attr("src") || "";
  const author = $(".series__author")
    .text()
    .trim()
    .split(/\s+/)
    .slice(1)
    .join(" ");
  const desc = $(".series__description").text().trim();
  const status = getStatus($);
  const lastUpdate = parseLastUpdate($);

  const info = {
    id: mangaId,
    titles: [title],
    image,
    author,
    desc,
    status,
    lastUpdate,
    langFlag: "en",
  };
  console.log(`[parseMangaDetails] info: ${JSON.stringify(info)}`);

  console.log(`[parseMangaDetails] returning result`);
  return createManga(info);
}

export function parseChapterList($: cheerio.Root, mangaId: string): Chapter[] {
  console.log(`[parseChapterList] start`);
  const chapters: Chapter[] = [];

  $(".chapter__card").map((i, chapter) => {
    console.log(`[parseChapterList] chapter start`);
    const title = $(".chapter__name", chapter).text().trim();

    let description = $(".chapter__subtitle", chapter).text().trim();
    if (/^".+"$/.test(description)) {
      description = description.slice(1, -1);
    }

    const info = {
      mangaId,
      id: encodeURIComponent(title),
      chapNum: parseFloat(title.split(" ").slice(1).join(" ")),
      name: description ? `${title}: ${description}` : title,
      time: new Date($(".chapter__date", chapter).text().trim()),
      langCode: LanguageCode.ENGLISH,
    };
    console.log(`[parseChapterList] info: ${JSON.stringify(info)}`);

    chapters.push(createChapter(info));
    console.log(`[parseChapterList] chapter done`);
  });

  console.log(`[parseChapterList] returning result`);
  return chapters;
}
