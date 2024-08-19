const tblAnuncios = document.getElementById("tblAnuncios");

function getAllAnuncios() {
  return fetch("/php/get_all_anuncios_listado.php")
    .then((response) => response.json())
    .then(function (response) {
      return response["Anuncios"];
    });
}

function changeEstado(idAnuncio, estado) {
  fetch(`/php/changeEstado_anuncios.php?id=${idAnuncio}&estado=${estado}`)
    .then((response) => response.json())
    .then(function (response) {
      const cambiado = response["success"];
      if (cambiado) {
        main();
      }
    });
}

function renderBtnBasedOnEstado(estado, idAnuncio) {
  if (estado === "1") {
    return (
      <button
        type=" button"
        class="btn btn-danger btn-sm mx-1"
        onClick={() => changeEstado(idAnuncio, estado)}
      >
        <i class="bi bi-x-lg"></i>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        class="btn btn-success btn-sm"
        onClick={() => changeEstado(idAnuncio, estado)}
      >
        <i class="bi bi-check-lg"></i>
      </button>
    );
  }
}

function renderTableData(anuncios) {
  let arrayComponentes = [];

  anuncios.forEach((anuncio) => {
    const oficial = anuncio["oficial"] === "1" ? "Si" : "No";
    const img =
      anuncio["url_imagen"] != "" ? <a href="#">Imagen</a> : "Sin Imagen";

    const component = (
      <tr>
        <td>{anuncio["id_Anuncio"]}</td>
        <td>
          <a href="#" class="text-reset fs-6">
            {anuncio["usuario"]}
          </a>
        </td>
        <td>
          <a
            href={`anuncio.html?id_anuncio=${anuncio["id_Anuncio"]}`}
            class="text-reset"
          >
            {anuncio["Titulo"]}
          </a>
        </td>
        <td>{oficial}</td>
        <td>{anuncio["Fecha"]}</td>
        <td>{anuncio["ubicacion"]}</td>
        <td>{anuncio["categoria"]}</td>
        <td>{img}</td>
        <td>
          {renderBtnBasedOnEstado(anuncio["estado"], anuncio["id_Anuncio"])}
        </td>
      </tr>
    );

    arrayComponentes.push(component);
  });

  ReactDOM.render(arrayComponentes, tblAnuncios);
}

async function main() {
  const anuncios = await getAllAnuncios();
  renderTableData(anuncios);
}

main();
