const dropdownDenuncias = document.getElementById("dropdownDenuncias");
const dropdownAnuncios = document.getElementById("dropdownAnuncios");

function renderOptionsDenuncias(loggedInData) {
  let arrayComponents = [
    <li>
      <a class="dropdown-item" href="/denuncias/denuncia-dash.html">
        Ver publicaciones
      </a>
    </li>,
  ];
  if (loggedInData["loggedIn"]) {
    const componentAddDenuncia = (
      <li>
        <a class="dropdown-item" href="/denuncias/denuncia-form.html">
          Agregar denuncias
        </a>
      </li>
    );

    arrayComponents.push(componentAddDenuncia);

    if (loggedInData["rol"] === "admin") {
      const componentListadoDenuncia = (
        <li>
          <a class="dropdown-item" href="/denuncias/denuncias-listado.html">
            Listado
          </a>
        </li>
      );

      arrayComponents.push(componentListadoDenuncia);
    }
  }

  ReactDOM.render(arrayComponents, dropdownDenuncias);
}

function renderOptionsAnuncio(loggedInData) {
  let arrayComponents = [
    <li>
      <a class="dropdown-item" href="/Anuncios/anuncios-dash.html">
        Ver publicaciones
      </a>
    </li>,
  ];
  if (loggedInData["loggedIn"]) {
    const componentAddAnuncio = (
      <li>
        <a class="dropdown-item" href="/Anuncios/anuncios-form.html">
          Agregar anuncios
        </a>
      </li>
    );

    arrayComponents.push(componentAddAnuncio);

    if (loggedInData["rol"] === "admin") {
      const componentListadoAnuncio = (
        <li>
          <a class="dropdown-item" href="/Anuncios/anuncios-listado.html">
            Listado
          </a>
        </li>
      );

      arrayComponents.push(componentListadoAnuncio);
    }
  }

  ReactDOM.render(arrayComponents, dropdownAnuncios);
}

async function main() {
  const loggedInData = await verifyIfLoggedIn();
  renderOptionsDenuncias(loggedInData);
  renderOptionsAnuncio(loggedInData);
}

main();
