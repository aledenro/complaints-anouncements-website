// Construir json para api request
const data = {
  query: {
    $query: {
      $and: [
        {
          conceptUri: "http://en.wikipedia.org/wiki/Costa_Rica",
        },
        {
          locationUri: "http://en.wikipedia.org/wiki/Costa_Rica",
        },
        {
          lang: "spa",
        },
      ],
    },
    $filter: {
      forceMaxDataTimeWindow: "5",
    },
  },
  resultType: "articles",
  articlesSortBy: "date",
  articlesCount: 50,
  includeArticleImage: true,
  apiKey: "760dccbc-8ed2-4bb1-838f-7801b0af3d20",
};

const url = "https://newsapi.ai/api/v1/article/getArticles";

// eletemntos html
const containerNews = document.getElementById("containerNews");

function getNewsApi() {
  // llamado al api para obtener las noticias
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      // obtiene del response las noticias en una lista
      const noticias = response["articles"]["results"];

      //construye los componentes dinamicos para react basado en la lista de articulos obtenidos
      let arrayComponentes = noticias.map((noticia, index) => (
        <div key={index}>
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col-auto d-none d-lg-block">
              <img src={noticia["image"]} width="300" height="250" />
            </div>

            <div class="col p-4 flex-column position-static">
              <div class="d-flex justify-content-between">
                <div class="mb-1 text-body-secondary" id="datetime">
                  {noticia["date"]}
                </div>
              </div>
              <h3 class="mt-3 mb-2">
                <a href={noticia["url"]} class="text-reset" target="_blank">
                  {noticia["title"]}
                </a>
              </h3>
            </div>
          </div>
        </div>
      ));

      // renderiza los elementos almacenados en la lista con react
      ReactDOM.render(<div>{arrayComponentes}</div>, containerNews);
    });
}

getNewsApi();
