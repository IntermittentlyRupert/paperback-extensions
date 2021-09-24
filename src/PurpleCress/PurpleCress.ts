import {
  ContentRating,
  SourceInfo,
  Manga,
  Chapter,
  ChapterDetails,
  SearchRequest,
  PagedResults,
  MangaUpdates,
  HomeSection,
} from "paperback-extensions-common";

import { BaseTemplate } from "../BaseTemplate";
import {
  BASE_URL,
  parseHomepage,
  parseFullMangaList,
  parseMangaDetails,
  parseLastUpdate,
  parseChapterList,
  parseChapterDetails,
} from "./parser";

export const PurpleCressInfo: SourceInfo = {
  version: "1.0.4",
  name: "Purple Cress",
  icon: "icon.png",
  description: "Extension that pulls manga from PurpleCress.com",
  author: "Rupert",
  language: "en",
  websiteBaseURL: BASE_URL,
  contentRating: ContentRating.MATURE,
};

export class PurpleCress extends BaseTemplate {
  baseUrl = BASE_URL;

  getMangaShareUrl(mangaId: string): string {
    console.log(`[getMangaShareUrl] start: ${mangaId}`);
    const url = `${BASE_URL}/series/${mangaId}`;
    console.log(`[getMangaShareUrl] returning result: ${url}`);
    return url;
  }

  async getHomePageSections(
    sectionCallback: (section: HomeSection) => void,
  ): Promise<void> {
    console.log("[getSearchResults] start");
    const data = await this.request("/");
    console.log("[getSearchResults] parsing home page");
    for (const section of parseHomepage(data)) {
      console.log("[getHomePageSections] returning section");
      sectionCallback(section);
    }
    console.log("[getSearchResults] done");
  }

  /**
   * HACK: PurpleCress has no search, so just do a simple filter on the full
   * manga list
   */
  async getSearchResults(
    query: SearchRequest,
    _metadata: any,
  ): Promise<PagedResults> {
    console.log("[getSearchResults] start");
    const data = await this.request("/");

    console.log("[getSearchResults] parsing manga list");
    let results = parseFullMangaList(data);
    console.log(`[getSearchResults] found ${results.length} manga`);

    if (query.title) {
      console.log(`[getSearchResults] applying filter: "${query.title}"`);
      const filter = query.title.replace(/\+/g, " ").trim().toLowerCase();
      console.log(`[getSearchResults] sanitised to: "${filter}"`);
      results = results.filter((result) =>
        (result.title.text || "").toLowerCase().includes(filter),
      );
      console.log(`[getSearchResults] found ${results.length} manga`);
    }

    console.log("[getSearchResults] returning results");
    return createPagedResults({ results });
  }

  async getWebsiteMangaDirectory(_metadata: any): Promise<PagedResults> {
    console.log("[getWebsiteMangaDirectory] start");
    const data = await this.request("/");
    console.log("[getWebsiteMangaDirectory] parsing manga list");
    const results = parseFullMangaList(data);
    console.log(
      `[getWebsiteMangaDirectory] returning ${results.length} results`,
    );
    return createPagedResults({ results });
  }

  async getMangaDetails(mangaId: string): Promise<Manga> {
    console.log(`[getMangaDetails] start: ${mangaId}`);
    const data = await this.request(`/series/${mangaId}`);
    console.log("[getMangaDetails] parsing page");
    const result = parseMangaDetails(data, mangaId);
    console.log("[getMangaDetails] returning results");
    return result;
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    console.log(`[getChapters] start: ${mangaId}`);
    const data = await this.request(`/series/${mangaId}`);
    console.log("[getChapters] parsing page");
    const results = parseChapterList(data, mangaId);
    console.log("[getChapters] returning results");
    return results;
  }

  async getChapterDetails(
    mangaId: string,
    chapterId: string,
  ): Promise<ChapterDetails> {
    console.log(`[getChapterDetails] start: ${mangaId} | ${chapterId}`);
    const data = await this.request(`/chapter/${mangaId}/${chapterId}`);
    console.log("[getChapterDetails] parsing page");
    const results = parseChapterDetails(data, mangaId, chapterId);
    console.log("[getChapterDetails] returning results");
    return results;
  }

  async filterUpdatedManga(
    mangaUpdatesFoundCallback: (updates: MangaUpdates) => void,
    time: Date,
    ids: string[],
  ): Promise<void> {
    console.log(`[filterUpdatedManga] requesting updates since ${time}`);

    // PurpleCress only gives us date-precision for the update time on the manga
    // page, but Paperback asks for updates since a specific date-time. If we
    // did a naive comparison, this would cause us to miss updates if an update
    // is posted on a day AFTER updates are fetched for midnight on that day.
    //
    // Instead, snap the requested date back to the start of the UTC day (update
    // timestamps are snapped to the start of their UTC day; see
    // `parser/series.ts > parseLastUpdate`). This will cause us to
    // double-report updates if `filterUpdatedManga` is called multiple times
    // for the same day, but it's probably better than the alternative.
    //
    // We could get the exact update timestamp by doing a second request for the
    // actual chapter page and pulling it from the `__NUXT__` data, but I'd
    // rather avoid that unless the double-updating is a big enough issue.
    const sinceDate = new Date(time.getTime());
    sinceDate.setUTCHours(0, 0, 0, 0);

    const sinceTime = sinceDate.getTime();
    console.log(
      `[filterUpdatedManga] finding updates since ${sinceDate} (${sinceTime})`,
    );

    const updatedTimestamps = await Promise.all(
      ids.map(async (mangaId) => {
        try {
          console.log(`[filterUpdatedManga] fetching ${mangaId}`);
          const data = await this.request(`/series/${mangaId}`);
          console.log(`[filterUpdatedManga] got ${mangaId}`);

          const updatedAt = parseLastUpdate(data);
          const updatedAtTime = updatedAt?.getTime();
          console.log(
            `[filterUpdatedManga] ${mangaId} updatedAt: ${updatedAt} (${updatedAtTime})`,
          );

          const isUpdated = updatedAtTime != null && updatedAtTime > sinceTime;
          console.log(
            `[filterUpdatedManga] ${mangaId} isUpdated: ${isUpdated}`,
          );
          return { mangaId, isUpdated };
        } catch (e) {
          console.error(`[filterUpdatedManga] failed for ${mangaId}: ${e}`);
          return { mangaId, isUpdated: false };
        }
      }),
    );

    const updatedIds = updatedTimestamps
      .filter(({ isUpdated }) => isUpdated)
      .map(({ mangaId }) => mangaId);

    console.log(
      `[filterUpdatedManga] updated IDs: ${JSON.stringify(updatedIds)}`,
    );

    mangaUpdatesFoundCallback(createMangaUpdates({ ids: updatedIds }));
  }
}
