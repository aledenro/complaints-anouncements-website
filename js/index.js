const url = "https://newsapi.ai/api/v1/article/getArticles";
const containerNews = document.getElementById("noticiasList");
const containerDenuncia = document.getElementById("containerDenuncia");
const containerAnuncio = document.getElementById("containerAnuncio");

// Construir json para api request
function apiRequest() {
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
    articlesCount: 4,
    includeArticleImage: true,
    apiKey: "760dccbc-8ed2-4bb1-838f-7801b0af3d20",
  };
  return data;
}

async function fetchData(action) {
  try {
    const response = await fetch(`/php/getLatest.php?action=${action}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderImageIfNotEmpty(img) {
  if (img !== "") {
    return (
      <div class="col-auto d-none d-lg-block">
        <img src={img} width="300" height="250" />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function getDenuncias() {
  fetchData("getDenuncias")
    .then((response) => {
      //   if (response.error) {
      //     console.error(response.error);
      //     return;
      //   }
      const denuncias = response["Denuncias"];
      let arrayComponentes = [];
      denuncias.forEach((denuncia) => {
        arrayComponentes.push(
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            {renderImageIfNotEmpty(denuncia["url_imagen"])}
            <div class="col p-4 flex-column position-static">
              <div class="d-flex justify-content-between">
                <strong class="d-inline-block mb-2 badge bg-primary-subtle text-primary-emphasis rounded-pill text-uppercase">
                  {denuncia["Categoria"]}
                </strong>
                <div class="mb-1 text-body-secondary" id="datetime">
                  {denuncia["Fecha"]}
                </div>
              </div>
              <h3 class="mt-3 mb-2">
                <a
                  href={`/denuncias/denuncia.html?id_denuncia=${denuncia["id_Denuncia"]}`}
                  class="text-reset"
                >
                  {denuncia["Titulo"]}
                </a>
              </h3>
              <div class="d-flex align-items-center justify-content-between mt-3">
                <div class="d-flex align-items-center mb-3 mb-md-0">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-person-circle"></i>
                    <div class="ms-2">
                      <a href="#" class="text-reset fs-6">
                        {denuncia["Anonimo"] === "0"
                          ? denuncia["usuario"]
                          : "Denuncia anónima"}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="me-3">
                    <i class="bi bi-chat"></i>
                    <span class="ms-2 fs-6">{denuncia["cantComentarios"]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
      ReactDOM.render(
        <div>{arrayComponentes}</div>,
        document.getElementById("containerDenuncia")
      );
    })
    .catch((error) => console.error("Error rendering denuncias: ", error));
}

function getAnuncios() {
  fetchData("getAnuncios")
    .then((response) => {
      if (response.error) {
        console.error(response.error);
        return;
      }
      const anuncios = response["Anuncios"];
      let arrayComponentes = [];

      anuncios.forEach((anuncio) => {
        const oficial = anuncio["oficial"] === "1";
        arrayComponentes.push(
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            {renderImageIfNotEmpty(anuncio["url_imagen"])}
            <div class="col p-4 flex-column position-static">
              <div class="d-flex justify-content-between">
                <strong
                  class={`d-inline-block mb-2 badge ${
                    oficial
                      ? "bg-primary-subtle text-primary-emphasis"
                      : "bg-secondary-subtle text-secondary-emphasis"
                  } rounded-pill text-uppercase`}
                >
                  {oficial ? "Oficial" : "No oficial"}
                </strong>
                <div class="mb-1 text-body-secondary" id="datetime">
                  {anuncio["Fecha"]}
                </div>
              </div>
              <h3 class="mt-3 mb-2">
                <a
                  href={`/Anuncios/anuncio.html?id_anuncio=${anuncio["id_Anuncio"]}`}
                  class="text-reset"
                >
                  {anuncio["Titulo"]}
                </a>
              </h3>
              <div class="d-flex align-items-center justify-content-between mt-3">
                <div class="d-flex align-items-center mb-3 mb-md-0">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-person-circle"></i>
                    <div class="ms-2">
                      <a href="#" class="text-reset fs-6">
                        {anuncio["usuario"]}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="me-3">
                    <i class="bi bi-chat"></i>
                    <span class="ms-2 fs-6">{anuncio["cantComentarios"]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });

      ReactDOM.render(
        <div>{arrayComponentes}</div>,
        document.getElementById("containerAnuncio")
      );
    })
    .catch((error) => console.error("Error rendering anuncios: ", error));
}

// llamado al api para obtener las noticias
function getNewsApi() {
  // llamado al api para obtener las noticias
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequest()),
  })
    .then((response) => response.json())
    .then((response) => {
      // obtiene del response las noticias en una lista
      const noticias = response["articles"]["results"];

      //construye los componentes dinamicos para react basado en la lista de articulos obtenidos
      let arrayComponentes = noticias.map((noticia, index) => (
        <div key={index}>
          <li>
            <a
              class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top text-reset"
              href={noticia["url"]}
              target="_blank"
            >
              <img src={noticia["image"]} width="120" height="96"></img>
              <div class="col-lg-8">
                <h6 class="mb-0">{noticia["title"]}</h6>
                <small class="text-body-secondary">{noticia["date"]}</small>
              </div>
            </a>
          </li>
        </div>
      ));
      // renderiza los elementos almacenados en la lista con react
      ReactDOM.render(<div>{arrayComponentes}</div>, containerNews);
    });
}

getNewsApi();
getDenuncias();
getAnuncios();
