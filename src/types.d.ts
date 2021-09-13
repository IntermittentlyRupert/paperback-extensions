declare global {
  // Apparently `<reference types="cheerio" />` isn't sufficient to put
  // `CheerioAPI` into scope for a bunch of `paperback-extensions-common` stuff.
  // This is a hacky workaround to just make it globally accessible.
  type CheerioAPI = cheerio.CheerioAPI;
}

// Make tests not hate me
import "jest-extended";
