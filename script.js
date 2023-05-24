var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var config = {
    api: {
        // Please note that placing the API key here is not recommended in a production environment. It's advisable to handle it securely on the server-side.
        apiKey: "0aa798659514d3ea9753b518ecb1b71e",
        apiUrl: "https://api.themoviedb.org/3/",
    },
    search: {
        term: "",
        type: "",
        page: 1,
        totalPages: 1,
    },
};
function search() {
    return __awaiter(this, void 0, void 0, function () {
        var queryString, urlParams, _a, results, total_pages, page, total_results, searchTerm;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    queryString = window.location.search;
                    console.log(queryString);
                    urlParams = new URLSearchParams(queryString);
                    config.search.type = urlParams.get("type");
                    // search-term is atr name from main input
                    config.search.term = urlParams.get("search-term");
                    if (!(config.search.term !== "" && config.search.type !== null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, searchAPIData()];
                case 1:
                    _a = _b.sent(), results = _a.results, total_pages = _a.total_pages, page = _a.page, total_results = _a.total_results;
                    console.log(results);
                    if (results.length === 0) {
                        console.log("no results");
                        return [2 /*return*/];
                    }
                    displaySearchResults(results);
                    searchTerm = document.querySelector("#search-term");
                    searchTerm.value = "";
                    return [3 /*break*/, 3];
                case 2:
                    showAlert("You need to enter a search term", "alert");
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function displaySearchResults(results) {
    var searchResults = document.querySelector("#search-results");
    var searchResultsHeading = document.querySelector("#search-results-heading");
    var pagination = document.querySelector("#pagination");
    searchResults.innerHTML = "";
    searchResultsHeading.innerHTML = "";
    pagination.innerHTML = "";
    results.forEach(function (result) {
        var _a;
        var div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = "\n          <a href=\"".concat(config.search.type, "-details.html?id=").concat(result.id, "\">\n            ").concat(result.poster_path
            ? "<img\n              src=\"https://image.tmdb.org/t/p/w500".concat(result.poster_path, "\"\n              class=\"card-img-top\"\n              alt=\"").concat(config.search.type === "movie" ? result.title : result.name, "\"\n            />")
            : "<img\n            src=\"../images/no-image.jpg\"\n            class=\"card-img-top\"\n             alt=\"".concat(config.search.type === "movie" ? result.title : result.name, "\"\n          />"), "\n          </a>\n          <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(config.search.type === "movie" ? result.title : result.name, "</h5>\n            <p class=\"card-text\">\n              <small class=\"text-muted\">Release: ").concat(config.search.type === "movie"
            ? result.release_date
            : result.first_air_date, "</small>\n            </p>\n          </div>\n        ");
        document.querySelector("#search-results-heading").innerHTML = "\n  <h2>".concat(results.length, " Results for ").concat(config.search.term, "</h2>\n");
        (_a = document.querySelector("#search-results")) === null || _a === void 0 ? void 0 : _a.appendChild(div);
    });
}
function searchAPIData() {
    return __awaiter(this, void 0, void 0, function () {
        var API_KEY, API_URL, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    API_KEY = config.api.apiKey;
                    API_URL = config.api.apiUrl;
                    return [4 /*yield*/, fetch("".concat(API_URL, "search/").concat(config.search.type, "?api_key=").concat(API_KEY, "&language=en-US&query=").concat(config.search.term, "&page=").concat(config.search.page))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function showAlert(message, className) {
    var alertEl = document.createElement("div");
    alertEl.classList.add("alert", className);
    alertEl.appendChild(document.createTextNode(message));
    var alertContainer = document.querySelector("#alert");
    if (alertContainer !== null) {
        alertContainer.appendChild(alertEl);
    }
    setTimeout(function () {
        alertEl.remove();
    }, 3000);
}
function init() {
    var _a;
    (_a = document
        .getElementById("search-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
        event.preventDefault();
        search();
    });
}
document.addEventListener("DOMContentLoaded", init);
