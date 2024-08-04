const searchParams = new URLSearchParams(window.location.search);
const id_anuncio = searchParams.get("id_anuncio");
const containerAnuncio = document.getElementById("containerAnuncio");

function getDetallesAnuncio(id) {
  return fetch(`/php/getInfoAnuncio.php?id_denuncia=${id}`)
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
}

function renderImageIfNotEmpty(img_anuncio) {
  if (img_anuncio !== "") {
    return (
      <div class="mt-6">
        <h4 class="pt-1">Imagen</h4>
        <figure class="my-6">
          <img
            src={img_anuncio}
            alt="evidence"
            class="rounded-3 img-fluid w-100"
          />
        </figure>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function constructDetallesAnuncio(jsonAnuncio) {
  const componenteAnuncio = (
    <div>
      <h1>{jsonAnuncio["Titulo"]}</h1>
      <div class="d-flex">
        <strong class="d-inline-block mb-2 badge bg-primary-subtle text-primary-emphasis rounded-pill text-uppercase mx-1">
          Tag
        </strong>
        <strong class="d-inline-block mb-2 badge bg-primary-subtle text-primary-emphasis rounded-pill text-uppercase mx-1">
          Tag
        </strong>
      </div>
      <div class="d-flex align-items-center mt-lg-6 mt-4 mb-3">
        <div class="me-5">
          <span class="fs-6">Publicado por</span>
          <div class="d-flex align-items-center mt-2">
            <i class="bi bi-person-circle"></i>
            <div class="ms-2">
              <a href="#" class="text-reset fs-6">
                {jsonAnuncio["usuario"]}
              </a>
            </div>
          </div>
        </div>
        <div>
          <span class="fs-6">Publicado el</span>
          <div class="mt-2 text-dark">
            <span class="fs-6">{jsonAnuncio["Fecha"]}</span>
          </div>
        </div>
      </div>

      <div class="my-6">
        <span class="fs-6">Este anuncio sucedió en</span>
        <div class="mt-2">
          <i class="bi bi-geo-fill"></i>
          <span class="fs-6 text-dark">{jsonAnuncio["ubicacion"]}</span>
        </div>
      </div>
      <p class="mt-4">{jsonAnuncio["Descripcion"]}</p>
      {renderImageIfNotEmpty(jsonAnuncio["url_imagen"])}
    </div>
  );

  ReactDOM.render(<div>{componenteAnuncio}</div>, containerAnuncio);
}

async function main() {
  const anuncio = await getDetallesAnuncio(id_anuncio);
  await constructDetallesAnuncio(anuncio);
}

main();
