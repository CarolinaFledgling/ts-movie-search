interface Config {
  api: {
    apiKey: string | undefined;
    apiUrl: string;
  };
  search: {
    term: string | null;
    type: string | null;
    page: number;
    totalPages: number;
  };
}

const config: Config = {
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

async function search() {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);

  config.search.type = urlParams.get("type");
  // search-term is atr name from main input
  config.search.term = urlParams.get("search-name");

  if (config.search.term !== "" && config.search.type !== null) {
    const results = await searchAPIData();
    console.log(results);
  } else {
    showAlert("You need to enter a search term", ".alert");
  }
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
  search();
}

document.addEventListener("DOMContentLoaded", init);
