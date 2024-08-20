const searchParams = new URLSearchParams(window.location.search);
const id_denuncia = searchParams.get("id_denuncia");
const containerDenuncia = document.getElementById("containerDenuncia");

function getDetallesDenuncia(id) {
  return fetch(`/php/getInfoDenuncia.php?id_denuncia=${id}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(id);
      console.log(response);
      return response;
    });
}

function renderImageIfNotEmpty(img_denuncia) {
  if (img_denuncia !== "") {
    return (
      <div class="mt-6">
        <h4 class="pt-1">Evidencia</h4>
        <figure class="my-6">
          <img
            src={img_denuncia}
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

function constructDetallesDenuncia(jsonDenuncia) {
  const usuarioLink =
    jsonDenuncia.Anonimo === 0
      ? `/usuario/perfil.html?id_usuario=${jsonDenuncia.id_Usuario}`
      : "#";
  const usuarioNombre =
    jsonDenuncia.Anonimo === 0 ? jsonDenuncia.Usuario : "Denuncia anónima";
  const componenteDenuncia = (
    <div>
      <h1>{jsonDenuncia["Titulo"]}</h1>
      <div class="d-flex ">
        <strong class="d-inline-block mb-2 badge bg-primary-subtle text-primary-emphasis rounded-pill text-uppercase mx-1">
          {jsonDenuncia["Categoria"]}
        </strong>
      </div>
      <div class="d-flex align-items-center mt-lg-6 mt-4 mb-3">
        <div class="me-5">
          <span class="fs-6">Publicado por</span>
          <div class="d-flex align-items-center mt-2">
            <i class="bi bi-person-circle"></i>
            <div class="ms-2">
              <a href={usuarioLink} className="text-reset fs-6">
                {usuarioNombre}
              </a>
            </div>
          </div>
        </div>
        <div>
          <span class="fs-6">Publicado el</span>
          <div class="mt-2 text-dark">
            <span class="fs-6">{jsonDenuncia["Fecha"]}</span>
          </div>
        </div>
      </div>

      <div class="my-6">
        <span class="fs-6">Esta denuncia sucedió en:</span>
        <div class="mt-2">
          <i class="bi bi-geo-fill"></i>
          <span class="fs-6 text-dark">{jsonDenuncia["Ubicacion"]}</span>
        </div>
      </div>
      <p class="mt-4">{jsonDenuncia["Descripcion"]}</p>
      {renderImageIfNotEmpty(jsonDenuncia["url_imagen"])}
    </div>
  );

  ReactDOM.render(<div>{componenteDenuncia}</div>, containerDenuncia);
}

async function main() {
  const denuncia = await getDetallesDenuncia(id_denuncia);
  constructDetallesDenuncia(denuncia);
}

main();
