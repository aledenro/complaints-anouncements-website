const tbldenuncias = document.getElementById("tblDenuncias");

function getAlldenuncias() {
  return fetch("/php/get_all_denuncias_listado.php")
    .then((response) => response.json())
    .then(function (response) {
      return response["Denuncias"];
    });
}

function changeEstado(idDenuncia, estado) {
  fetch(`/php/changeEstado_denuncias.php?id=${idDenuncia}&estado=${estado}`)
    .then((response) => response.json())
    .then(function (response) {
      const cambiado = response["success"];
      if (cambiado) {
        main();
      }
    });
}

function renderBtnBasedOnEstado(estado, idDenuncia) {
  if (estado === "1") {
    return (
      <button
        type=" button"
        class="btn btn-danger btn-sm mx-1"
        onClick={() => changeEstado(idDenuncia, estado)}
      >
        <i class="bi bi-x-lg"></i>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        class="btn btn-success btn-sm"
        onClick={() => changeEstado(idDenuncia, estado)}
      >
        <i class="bi bi-check-lg"></i>
      </button>
    );
  }
}

function renderTableData(denuncias) {
  let arrayComponentes = [];

  denuncias.forEach((denuncia) => {
    const anonimo = denuncia["Anonimo"] === "1" ? "Si" : "No";
    const img =
      denuncia["url_imagen"] != "" ? <a href="#">Imagen</a> : "Sin Imagen";

    const component = (
      <tr>
        <td>{denuncia["id_Denuncia"]}</td>
        <td>
          <a href="#" class="text-reset fs-6">
            {denuncia["usuario"]}
          </a>
        </td>
        <td>
          <a
            href={`denuncia.html?id_denuncia=${denuncia["id_Denuncia"]}`}
            class="text-reset"
          >
            {denuncia["Titulo"]}
          </a>
        </td>
        <td>{anonimo}</td>
        <td>{denuncia["Fecha"]}</td>
        <td>{denuncia["ubicacion"]}</td>
        <td>{denuncia["Categoria"]}</td>
        <td>{img}</td>
        <td>
          {renderBtnBasedOnEstado(denuncia["estado"], denuncia["id_Denuncia"])}
        </td>
      </tr>
    );

    arrayComponentes.push(component);
  });

  ReactDOM.render(arrayComponentes, tbldenuncias);
}

async function main() {
  const denuncias = await getAlldenuncias();
  console.log(denuncias);
  renderTableData(denuncias);
}

main();
