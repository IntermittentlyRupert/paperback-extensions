(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTemplate = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
class BaseTemplate extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 5,
            requestTimeout: 10000,
        });
    }
    request(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[request] starts: ${url}`);
            const options = createRequestObject({
                method: "GET",
                url: `${this.baseUrl}${url}`,
            });
            const response = yield this.requestManager.schedule(options, 1);
            console.log(`[request] completed: ${url} | status=${response.status} length=${response.data.length}`);
            const data = this.cheerio.load(response.data);
            console.log(`[request] loaded: ${url}`);
            return data;
        });
    }
}
exports.BaseTemplate = BaseTemplate;

},{"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurpleCress = exports.PurpleCressInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const BaseTemplate_1 = require("../BaseTemplate");
const parser_1 = require("./parser");
exports.PurpleCressInfo = {
    version: "1.0.2",
    name: "Purple Cress",
    icon: "icon.png",
    description: "Extension that pulls manga from PurpleCress.com",
    author: "Rupert",
    language: "en",
    websiteBaseURL: parser_1.BASE_URL,
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
};
class PurpleCress extends BaseTemplate_1.BaseTemplate {
    constructor() {
        super(...arguments);
        this.baseUrl = parser_1.BASE_URL;
    }
    getMangaShareUrl(mangaId) {
        console.log(`[getMangaShareUrl] start: ${mangaId}`);
        const url = `${parser_1.BASE_URL}/series/${mangaId}`;
        console.log(`[getMangaShareUrl] returning result: ${url}`);
        return url;
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[getSearchResults] start");
            const data = yield this.request("/");
            console.log("[getSearchResults] parsing home page");
            for (const section of (0, parser_1.parseHomepage)(data)) {
                console.log("[getHomePageSections] returning section");
                sectionCallback(section);
            }
            console.log("[getSearchResults] done");
        });
    }
    /**
     * HACK: PurpleCress has no search, so just do a simple filter on the full
     * manga list
     */
    getSearchResults(query, _metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[getSearchResults] start");
            const data = yield this.request("/");
            console.log("[getSearchResults] parsing manga list");
            let results = (0, parser_1.parseFullMangaList)(data);
            console.log(`[getSearchResults] found ${results.length} manga`);
            if (query.title) {
                console.log(`[getSearchResults] applying filter: "${query.title}"`);
                const filter = query.title.replace(/\+/g, " ").trim().toLowerCase();
                console.log(`[getSearchResults] sanitised to: "${filter}"`);
                results = results.filter((result) => (result.title.text || "").toLowerCase().includes(filter));
                console.log(`[getSearchResults] found ${results.length} manga`);
            }
            console.log("[getSearchResults] returning results");
            return createPagedResults({ results });
        });
    }
    getWebsiteMangaDirectory(_metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[getWebsiteMangaDirectory] start");
            const data = yield this.request("/");
            console.log("[getWebsiteMangaDirectory] parsing manga list");
            const results = (0, parser_1.parseFullMangaList)(data);
            console.log(`[getWebsiteMangaDirectory] returning ${results.length} results`);
            return createPagedResults({ results });
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[getMangaDetails] start: ${mangaId}`);
            const data = yield this.request(`/series/${mangaId}`);
            console.log("[getMangaDetails] parsing page");
            const result = (0, parser_1.parseMangaDetails)(data, mangaId);
            console.log("[getMangaDetails] returning results");
            return result;
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[getChapters] start: ${mangaId}`);
            const data = yield this.request(`/series/${mangaId}`);
            console.log("[getChapters] parsing page");
            const results = (0, parser_1.parseChapterList)(data, mangaId);
            console.log("[getChapters] returning results");
            return results;
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[getChapterDetails] start: ${mangaId} | ${chapterId}`);
            const data = yield this.request(`/chapter/${mangaId}/${chapterId}`);
            console.log("[getChapterDetails] parsing page");
            const results = (0, parser_1.parseChapterDetails)(data, mangaId, chapterId);
            console.log("[getChapterDetails] returning results");
            return results;
        });
    }
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const sinceTime = time.getTime();
            console.log(`[filterUpdatedManga] finding updates since ${time} (${sinceTime})`);
            const updatedTimestamps = yield Promise.all(ids.map((mangaId) => __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log(`[filterUpdatedManga] fetching ${mangaId}`);
                    const data = yield this.request(`/series/${mangaId}`);
                    console.log(`[filterUpdatedManga] got ${mangaId}`);
                    const updatedAt = (0, parser_1.parseLastUpdate)(data);
                    const updatedAtTime = updatedAt === null || updatedAt === void 0 ? void 0 : updatedAt.getTime();
                    console.log(`[filterUpdatedManga] ${mangaId} updatedAt: ${updatedAt} (${updatedAtTime})`);
                    const isUpdated = updatedAtTime != null && updatedAtTime > sinceTime;
                    console.log(`[filterUpdatedManga] ${mangaId} isUpdated: ${isUpdated}`);
                    return { mangaId, isUpdated };
                }
                catch (e) {
                    console.error(`[filterUpdatedManga] failed for ${mangaId}: ${e}`);
                    return { mangaId, isUpdated: false };
                }
            })));
            const updatedIds = updatedTimestamps
                .filter(({ isUpdated }) => isUpdated)
                .map(({ mangaId }) => mangaId);
            console.log(`[filterUpdatedManga] updated IDs: ${JSON.stringify(updatedIds)}`);
            mangaUpdatesFoundCallback(createMangaUpdates({ ids: updatedIds }));
        });
    }
}
exports.PurpleCress = PurpleCress;

},{"../BaseTemplate":48,"./parser":52,"paperback-extensions-common":5}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChapterDetails = void 0;
function parseChapterDetails($, mangaId, chapterId) {
    console.log(`[parseChapterDetails] start`);
    const pages = [];
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
exports.parseChapterDetails = parseChapterDetails;

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFullMangaList = exports.parseHomepage = void 0;
function getSections($) {
    const sections = $(".section--1 .wrap--content--no-margin").children();
    const latest = sections[0];
    const all = sections[1];
    return { latest, all };
}
function getSectionTitle($, section) {
    // trim the first word, because it's just the icon alt text
    return $("h1", section)
        .text()
        .trim()
        .split(/\s+/)
        .slice(1)
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}
function getLatestItems($, section) {
    console.log(`[getLatestItems] start`);
    const tiles = [];
    $(".card--small", section).map((i, item) => {
        console.log(`[getLatestItems] item start`);
        const title = $(".chapter__series-name", item).text().trim();
        const id = encodeURIComponent(title);
        const image = $("img.image", item).attr("src") || "";
        console.log(`[getLatestItems] item: ${JSON.stringify({ id, title, image })}`);
        tiles.push(createMangaTile({
            id,
            title: createIconText({ text: title }),
            image,
        }));
        console.log(`[getLatestItems] item done`);
    });
    console.log(`[getLatestItems] done`);
    return tiles;
}
function getCardItems($, section) {
    console.log(`[getCardItems] start`);
    const tiles = [];
    $(".card", section).map((i, item) => {
        console.log(`[getCardItems] item start`);
        const title = $(".card__info", item).text().trim();
        const id = encodeURIComponent(title);
        const image = $("img.image", item).attr("src") || "";
        console.log(`[getCardItems] item: ${JSON.stringify({ id, title, image })}`);
        tiles.push(createMangaTile({
            id,
            title: createIconText({ text: title }),
            image,
        }));
        console.log(`[getCardItems] item done`);
    });
    console.log(`[getCardItems] done`);
    return tiles;
}
function parseHomepage($) {
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
exports.parseHomepage = parseHomepage;
function parseFullMangaList($) {
    const { all } = getSections($);
    return getCardItems($, all);
}
exports.parseFullMangaList = parseFullMangaList;

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = exports.parseChapterDetails = exports.parseChapterList = exports.parseMangaDetails = exports.parseLastUpdate = exports.parseFullMangaList = exports.parseHomepage = void 0;
var homepage_1 = require("./homepage");
Object.defineProperty(exports, "parseHomepage", { enumerable: true, get: function () { return homepage_1.parseHomepage; } });
Object.defineProperty(exports, "parseFullMangaList", { enumerable: true, get: function () { return homepage_1.parseFullMangaList; } });
var series_1 = require("./series");
Object.defineProperty(exports, "parseLastUpdate", { enumerable: true, get: function () { return series_1.parseLastUpdate; } });
Object.defineProperty(exports, "parseMangaDetails", { enumerable: true, get: function () { return series_1.parseMangaDetails; } });
Object.defineProperty(exports, "parseChapterList", { enumerable: true, get: function () { return series_1.parseChapterList; } });
var chapter_1 = require("./chapter");
Object.defineProperty(exports, "parseChapterDetails", { enumerable: true, get: function () { return chapter_1.parseChapterDetails; } });
exports.BASE_URL = "https://purplecress.com";

},{"./chapter":50,"./homepage":51,"./series":53}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChapterList = exports.parseMangaDetails = exports.parseLastUpdate = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
function getStatus($) {
    const status = $("series__status").text().trim().toLowerCase();
    console.log(`[getStatus] raw status: ${status}`);
    switch (status) {
        case "ongoing":
            return paperback_extensions_common_1.MangaStatus.ONGOING;
        case "dropped":
            return paperback_extensions_common_1.MangaStatus.ABANDONED;
        case "finished":
            return paperback_extensions_common_1.MangaStatus.COMPLETED;
        default:
            return paperback_extensions_common_1.MangaStatus.UNKNOWN;
    }
}
function parseLastUpdate($) {
    console.log(`[parseLastUpdate] start`);
    const rawLastUpdate = $(".chapter__date").first().text().trim();
    console.log(`[parseLastUpdate] raw lastUpdate: ${rawLastUpdate}`);
    const lastUpdate = new Date(rawLastUpdate);
    console.log(`[parseLastUpdate] parsed lastUpdate: ${rawLastUpdate}`);
    if (isNaN(lastUpdate.getTime())) {
        console.error(`[parseLastUpdate] date is not valid!`);
        return undefined;
    }
    console.log(`[parseLastUpdate] done`);
    return lastUpdate;
}
exports.parseLastUpdate = parseLastUpdate;
function parseMangaDetails($, mangaId) {
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
exports.parseMangaDetails = parseMangaDetails;
function parseChapterList($, mangaId) {
    console.log(`[parseChapterList] start`);
    const chapters = [];
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
            langCode: paperback_extensions_common_1.LanguageCode.ENGLISH,
        };
        console.log(`[parseChapterList] info: ${JSON.stringify(info)}`);
        chapters.push(createChapter(info));
        console.log(`[parseChapterList] chapter done`);
    });
    console.log(`[parseChapterList] returning result`);
    return chapters;
}
exports.parseChapterList = parseChapterList;

},{"paperback-extensions-common":5}]},{},[49])(49)
});
