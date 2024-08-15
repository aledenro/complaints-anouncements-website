const searchParams = new URLSearchParams(window.location.search);
const id_anuncio = searchParams.get("id_anuncio");
const containerCantComentarios = document.getElementById(
  "containerCantComentarios"
);

const containerComentarios = document.getElementById("containerComentarios");

function getComentarios(id) {
  return fetch(`/php/get_comentarios_anuncios.php?id_denuncia=${id}`)
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
}

function renderCountComentarios(comentarios) {
  const cantComentariosElement = (
    <ul class="nav nav-stack py-3 small">
      <li class="nav-item">
        <a class="nav-link" href="#!">
          Comentarios ({comentarios["countComentarios"]})
          <i class="bi bi-chat-fill pe-1"></i>
        </a>
      </li>
    </ul>
  );

  ReactDOM.render(cantComentariosElement, containerCantComentarios);
}

function renderComentarios(comentarios) {
  const arrayComentarios = comentarios["Comentarios"];
  let arrayComponentes = [];

  arrayComentarios.forEach((comentario) => {
    const elemento = (
      <ul class="comment-wrap list-unstyled">
        <li class="comment-item">
          <div class="d-flex position-relative">
            <div class="avatar avatar-xs">
              <a href="#!">
                <img
                  class="avatar-img rounded-circle"
                  src="assets/images/avatar/05.jpg"
                  alt=""
                />
              </a>
            </div>
            <div class="ms-2 mb-3">
              <div class="bg-light rounded-start-top-0 p-3 rounded">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-1">
                    <a href="#!">
                      <i class="bi bi-person-circle"></i>
                      {comentario["Usuario"]}
                    </a>
                  </h6>
                  <small class="ms-2">{comentario["Fecha"]}</small>
                </div>
                <p class="small mb-0">{comentario["Texto"]}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    );
    arrayComponentes.push(elemento);

    ReactDOM.render(arrayComponentes, containerComentarios);
  });
}

async function main(id) {
  const comentarios = await getComentarios(id);
  await renderCountComentarios(comentarios);
  await renderComentarios(comentarios);
}

main(id_anuncio);
