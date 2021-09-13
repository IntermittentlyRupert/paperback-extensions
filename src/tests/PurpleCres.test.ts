import cheerio from "cheerio";
import { APIWrapper } from "paperback-extensions-common";

import { PurpleCress } from "../PurpleCress/PurpleCress";

let wrapper: APIWrapper;
let source: PurpleCress;

beforeEach(() => {
  wrapper = new APIWrapper();
  source = new PurpleCress(cheerio);
});

test("getHomePageSections", async () => {
  const result = await wrapper.getHomePageSections(source);
  expect(result).toMatchObject([
    {
      id: "latest",
      title: expect.any(String),
      items: expect.any(Array),
      view_more: false,
    },
    {
      id: "all",
      title: expect.any(String),
      items: expect.any(Array),
      view_more: false,
    },
  ]);
  expect(result[0].items).toEqual(
    Array((result[0].items || []).length).fill(
      expect.objectContaining({
        id: expect.any(String),
        title: { text: expect.any(String) },
        image: expect.any(String),
      }),
    ),
  );
  expect(result[1].items).toEqual(
    Array((result[1].items || []).length).fill(
      expect.objectContaining({
        id: expect.any(String),
        title: { text: expect.any(String) },
        image: expect.any(String),
      }),
    ),
  );
});
