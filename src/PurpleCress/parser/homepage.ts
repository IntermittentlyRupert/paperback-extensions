import type { HomeSection, MangaTile } from "paperback-extensions-common";

function getSections($: cheerio.Root): {
  latest: cheerio.Element;
  all: cheerio.Element;
} {
  const sections = $(".section--1 .wrap--content--no-margin").children();
  const latest = sections[0];
  const all = sections[1];
  return { latest, all };
}

function getSectionTitle($: cheerio.Root, section: cheerio.Element): string {
  // trim the first word, because it's just the icon alt text
  return $("h1", section)
    .text()
    .trim()
    .split(/\s+/)
    .slice(1)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getLatestItems(
  $: cheerio.Root,
  section: cheerio.Element,
): MangaTile[] {
  console.log(`[getLatestItems] start`);
  const tiles: MangaTile[] = [];

  $(".card--small", section).map((i, item): void => {
    console.log(`[getLatestItems] item start`);
    const title = $(".chapter__series-name", item).text().trim();
    const id = encodeURIComponent(title);
    const image = $("img.image", item).attr("src") || "";
    console.log(
      `[getLatestItems] item: ${JSON.stringify({ id, title, image })}`,
    );
    tiles.push(
      createMangaTile({
        id,
        title: createIconText({ text: title }),
        image,
      }),
    );
    console.log(`[getLatestItems] item done`);
  });

  console.log(`[getLatestItems] done`);
  return tiles;
}

function getCardItems($: cheerio.Root, section: cheerio.Element): MangaTile[] {
  console.log(`[getCardItems] start`);
  const tiles: MangaTile[] = [];

  $(".card", section).map((i, item) => {
    console.log(`[getCardItems] item start`);
    const title = $(".card__info", item).text().trim();
    const id = encodeURIComponent(title);
    const image = $("img.image", item).attr("src") || "";
    console.log(`[getCardItems] item: ${JSON.stringify({ id, title, image })}`);
    tiles.push(
      createMangaTile({
        id,
        title: createIconText({ text: title }),
        image,
      }),
    );
    console.log(`[getCardItems] item done`);
  });

  console.log(`[getCardItems] done`);
  return tiles;
}

export function parseHomepage($: cheerio.Root): HomeSection[] {
  console.log("[parseHomepage] getting sections");
  const { latest, all } = getSections($);

  console.log("[parseHomepage] parsing latest");
  const latestSection = {
    id: "latest",
    title: getSectionTitle($, latest),
    items: getLatestItems($, latest),
    view_more: false,
  };

  console.log("[parseHomepage] parsing all");
  const allSection = {
    id: "all",
    title: getSectionTitle($, all),
    items: getCardItems($, all),
    view_more: false,
  };

  console.log("[parseHomepage] returning sections");
  return [createHomeSection(latestSection), createHomeSection(allSection)];
}

export function parseFullMangaList($: cheerio.Root) {
  const { all } = getSections($);
  return getCardItems($, all);
}
