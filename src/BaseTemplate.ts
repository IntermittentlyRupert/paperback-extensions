import type { CheerioAPI } from "cheerio";
import { Source } from "paperback-extensions-common";

export abstract class BaseTemplate extends Source {
  protected abstract readonly baseUrl: string;

  readonly requestManager = createRequestManager({
    requestsPerSecond: 5,
    requestTimeout: 10000,
  });

  protected async request(url: string): Promise<CheerioAPI> {
    console.log(`[request] starts: ${url}`);
    const options = createRequestObject({
      method: "GET",
      url: `${this.baseUrl}${url}`,
    });
    const response = await this.requestManager.schedule(options, 1);
    console.log(
      `[request] completed: ${url} | status=${response.status} length=${response.data.length}`,
    );
    const data = this.cheerio.load(response.data);
    console.log(`[request] loaded: ${url}`);
    return data;
  }
}
