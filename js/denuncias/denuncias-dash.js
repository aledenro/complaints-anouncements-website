const containerDenuncias = document.getElementById("containerDenuncias");

function renderImageIfNotEmpty(img_denuncia) {
  if (img_denuncia !== "") {
    return (
      <div class="col-auto d-none d-lg-block">
        <img src={img_denuncia} width="300" height="250" />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function getAllDenuncias() {
  fetch("/php/get_all_denuncias.php")
    .then((response) => response.json())
    .then(function (response) {
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
                  href={`denuncia.html?id_denuncia=${denuncia["id_Denuncia"]}`}
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

      ReactDOM.render(<div>{arrayComponentes}</div>, containerDenuncias);
    })
    .catch((error) =>
      console.error("Error al llamar el backend de get all denuncias: ", error)
    );
}

getAllDenuncias();
