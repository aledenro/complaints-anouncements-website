const containerAnuncios = document.getElementById("containerAnuncios");

function renderImageIfNotEmpty(img_anuncio) {
  if (img_anuncio !== "") {
    return (
      <div class="col-auto d-none d-lg-block">
        <img src={img_anuncio} width="300" height="250" />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function getAllAnuncios() {
  fetch("/php/get_all_anuncios.php")
    .then((response) => response.json())
    .then(function (response) {
      const anuncios = response["Anuncios"];

      let arrayComponentes = [];

      anuncios.forEach((anuncio) => {
        if (anuncio["oficial"] === "1") {
          arrayComponentes.push(
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              {renderImageIfNotEmpty(anuncio["url_imagen"])}
              <div class="col p-4 flex-column position-static">
                <div class="d-flex justify-content-between">
                  <strong class="d-inline-block mb-2 badge bg-primary-subtle text-primary-emphasis rounded-pill text-uppercase">
                    Oficial
                  </strong>
                  <div class="mb-1 text-body-secondary" id="datetime">
                    {anuncio["Fecha"]}
                  </div>
                </div>
                <h3 class="mt-3 mb-2">
                  <a
                    href={`anuncio.html?id_anuncio=${anuncio["id_Anuncio"]}`}
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
                      <span class="ms-2 fs-6">
                        {anuncio["cantComentarios"]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (anuncio["oficial"] === "0") {
          arrayComponentes.push(
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              {renderImageIfNotEmpty(anuncio["url_imagen"])}
              <div class="col p-4 flex-column position-static">
                <div class="d-flex justify-content-between">
                  <strong class="d-inline-block mb-2 badge bg-secondary-subtle text-secondary-emphasis rounded-pill text-uppercase">
                    No Oficial
                  </strong>
                  <div class="mb-1 text-body-secondary" id="datetime">
                    {anuncio["Fecha"]}
                  </div>
                </div>
                <h3 class="mt-3 mb-2">
                  <a
                    href={`anuncio.html?id_anuncio=${anuncio["id_Anuncio"]}`}
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
                      <span class="ms-2 fs-6">
                        {anuncio["cantComentarios"]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });

      ReactDOM.render(<div>{arrayComponentes}</div>, containerAnuncios);
    })
    .catch((error) =>
      console.error("Error al llamar el backend de get all denuncias: ", error)
    );
}

getAllAnuncios();
