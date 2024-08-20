const url = new URL(window.location.href);
const id_usuario = url.searchParams.get("id_usuario");

const containerUsuario = document.getElementById("containerUsuario");
const containerDenuncia = document.getElementById("containerDenuncia");
const containerAnuncio = document.getElementById("containerAnuncio");
const containerPublicaciones = document.getElementById(
  "containerPublicaciones"
);

async function fetchDenuncias(id, action) {
  const response = await fetch(
    `/php/getUsuarioPublicaciones.php?action=${action}&id_usuario=${id}`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function fetchAnuncios(id, action) {
  const response = await fetch(
    `/php/getUsuarioPublicaciones.php?id_usuario=${id}&action=${action}`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function getDatosUsuario(id) {
  const response = await fetch(`/php/getInfoUsuario.php?id_usuario=${id}`);
  const data = await response.json();
  console.log("usuario perfil: " + id);
  // console.log(data);
  return data;
}

function compareUsers() {
  return fetch("/php/verifyIfLoggedIn.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn) {
        const id_log = String(data.id_Usuario);
        const id_perfil = String(id_usuario);

        console.log("id loggeado: " + id_log);
        if (id_log === id_perfil) {
          console.log("mismo usuario");
          return true;
        } else {
          console.log("diferentes usuarios");
          return false;
        }
      } else {
        console.log("No log");
        return false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
}

function renderDatosUsuario(usuario) {
  compareUsers().then((mismoUsuario) => {
    let infoUsuario;

    if (mismoUsuario) {
      infoUsuario = (
        <div>
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-lg-5">
              <div className="d-flex align-items-center">
                <span>
                  <i className="bi bi-person-circle h1"></i>
                </span>
                <div className="ms-4">
                  <h3 className="mb-0">{usuario["Usuario"]}</h3>
                </div>
              </div>
              <div className="pt-3">
                <h5 className="pt-3">Informacion de la cuenta</h5>
                <p className="fw-bold">Correo electronico:</p>
                <p>{usuario["Correo"]}</p>
                <p className="fw-bold">Telefono celular:</p>
                <p>{usuario["Telefono"]}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      infoUsuario = (
        <div>
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-lg-5">
              <div className="d-flex align-items-center">
                <span>
                  <i className="bi bi-person-circle h1"></i>
                </span>
                <div className="ms-4">
                  <h3 className="mb-0">{usuario["Usuario"]}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    ReactDOM.render(infoUsuario, containerUsuario);
  });
}

function renderImageIfNotEmpty(img) {
  if (img !== "") {
    return (
      <div className="col-auto d-none d-lg-block">
        <img src={img} width="300" height="250" />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function renderDenuncias() {
  fetchDenuncias(id_usuario, "getDenuncias")
    .then((response) => {
      const denuncias = response["Denuncias"];
      let arrayComponentes = [];
      denuncias.forEach((denuncia) => {
        const isAnonymous = denuncia.Anonimo === 0; // Adjust based on actual data type
        const usuarioLink = isAnonymous
          ? `/usuario/perfil.html?id_usuario=${denuncia.id_Usuario}`
          : "#";
        const usuarioNombre = isAnonymous
          ? denuncia.Usuario
          : "Denuncia anónima";
        arrayComponentes.push(
          <div key={denuncia["id_Denuncia"]}>
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
                        <a href={usuarioLink} className="text-reset fs-6">
                          {usuarioNombre}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="me-3">
                      <i class="bi bi-chat"></i>
                      <span class="ms-2 fs-6">
                        {denuncia["cantComentarios"]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
      ReactDOM.render(<div>{arrayComponentes}</div>, containerDenuncia);
    })
    .catch((error) =>
      console.error("No se pudieron renderizar las denuncias: ", error)
    );
}

function renderAnuncios() {
  fetchAnuncios(id_usuario, "getAnuncios")
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
          <div key={anuncio["id_Anuncio"]}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              {renderImageIfNotEmpty(anuncio["url_imagen"])}
              <div className="col p-4 flex-column position-static">
                <div className="d-flex justify-content-between">
                  <strong
                    className={`d-inline-block mb-2 badge ${
                      oficial
                        ? "bg-primary-subtle text-primary-emphasis"
                        : "bg-secondary-subtle text-secondary-emphasis"
                    } rounded-pill text-uppercase`}
                  >
                    {oficial ? "Oficial" : "No oficial"}
                  </strong>
                  <div className="mb-1 text-body-secondary" id="datetime">
                    {anuncio["Fecha"]}
                  </div>
                </div>
                <h3 className="mt-3 mb-2">
                  <a
                    href={`/Anuncios/anuncio.html?id_anuncio=${anuncio["id_Anuncio"]}`}
                    className="text-reset"
                  >
                    {anuncio["Titulo"]}
                  </a>
                </h3>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person-circle"></i>
                      <div className="ms-2">
                        <a href="#" className="text-reset fs-6">
                          {anuncio["usuario"]}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="me-3">
                      <i className="bi bi-chat"></i>
                      <span className="ms-2 fs-6">
                        {anuncio["cantComentarios"]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });

      ReactDOM.render(<div>{arrayComponentes}</div>, containerAnuncio);
    })
    .catch((error) =>
      console.error("No se pudieron renderizar los anuncios: ", error)
    );
}

function main() {
  getDatosUsuario(id_usuario).then(renderDatosUsuario);
  renderAnuncios();
  renderDenuncias();
}

main();
