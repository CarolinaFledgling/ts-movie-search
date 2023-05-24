interface Config {
  api: {
    apiKey: string | undefined;
    apiUrl: string;
  };
  search: {
    term: string | null;
    type: string | null;
    page: number;
    totalPages?: number;
    totalResults?: string;
  };
}

const config: Config = {
  api: {
    // Please note that placing the API key here is not recommended in a production environment. It's advisable to handle it securely on the server-side.
    apiKey: "",
    apiUrl: "https://api.themoviedb.org/3/",
  },
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
  },
};

async function search() {
  const queryString = window.location.search;
  console.log(queryString);

  // The parameters are extracted from the URL using the URLSearchParams object.
  // These parameters are assigned to the corresponding fields in the configuration object config.search, such as the search type (type) and the entered text (term).

  const urlParams = new URLSearchParams(queryString);

  config.search.type = urlParams.get("type");
  // search-term is atr name from main input
  config.search.term = urlParams.get("search-term");

  if (config.search.term !== "" && config.search.type !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();
    console.log(results);

    if (results.length === 0) {
      console.log("no results");
      return;
    }
    displaySearchResults(results);

    const searchTerm = document.querySelector(
      "#search-term"
    ) as HTMLInputElement;
    searchTerm.value = "";
  } else {
    showAlert("You need to enter a search term", "alert");
  }
}

interface SearchResult {
  id: number;
  title: string;
  name: string;
  poster_path: string | null;
  release_date: string;
  first_air_date: string;
}

function displaySearchResults(results: SearchResult[]) {
  const searchResults = document.querySelector(
    "#search-results"
  ) as HTMLElement;
  const searchResultsHeading = document.querySelector(
    "#search-results-heading"
  ) as HTMLElement;
  const pagination = document.querySelector("#pagination") as HTMLElement;

  searchResults.innerHTML = "";
  searchResultsHeading.innerHTML = "";
  pagination.innerHTML = "";

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="${config.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${
                config.search.type === "movie" ? result.title : result.name
              }"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
             alt="${
               config.search.type === "movie" ? result.title : result.name
             }"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              config.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                config.search.type === "movie"
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
        `;

    (
      document.querySelector("#search-results-heading")! as HTMLElement
    ).innerHTML = `
  <h2>${results.length} Results for ${config.search.term}</h2>
`;
    document.querySelector("#search-results")?.appendChild(div);
  });
}

async function searchAPIData() {
  const API_KEY = config.api.apiKey;
  const API_URL = config.api.apiUrl;

  const response = await fetch(
    `${API_URL}search/${config.search.type}?api_key=${API_KEY}&language=en-US&query=${config.search.term}&page=${config.search.page}`
  );
  const data = await response.json();
  return data;
}

function showAlert(message: string, className: string) {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));

  const alertContainer = document.querySelector("#alert");
  if (alertContainer !== null) {
    alertContainer.appendChild(alertEl);
  }

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

function init() {
  document
    .getElementById("search-form")
    ?.addEventListener("submit", function (event) {
      event.preventDefault();
      search();
    });
}

document.addEventListener("DOMContentLoaded", init);
