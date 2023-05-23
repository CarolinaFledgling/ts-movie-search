

interface Config {
  api: {
    apiKey: string | undefined;
    apiUrl: string;
  };
}

const config: Config = {
  api: {
     // Please note that placing the API key here is not recommended in a production environment. It's advisable to handle it securely on the server-side.
    apiKey: "",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

async function search() {
  const queryString = window.location.search;
  console.log(queryString);
}

function init() {
  search();
}

document.addEventListener("DOMContentLoaded", init);
