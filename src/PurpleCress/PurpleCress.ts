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
  version: "1.0.2",
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
    const sinceTime = time.getTime();
    console.log(
      `[filterUpdatedManga] finding updates since ${time} (${sinceTime})`,
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
