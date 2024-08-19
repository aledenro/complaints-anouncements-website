const containerAnuncios = document.getElementById("containerAnuncios");

function getAllAnuncios() {
  fetch("/php/get_all_denuncias.php")
    .then((response) => response.json())
    .then((response) => console.log(response));
}

getAllAnuncios();
/*
<div
                        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col-auto d-none d-lg-block">
                            <svg class="bd-placeholder-img img-fluid rounded-" width="300" height="250"
                                xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                                preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                            </svg>
                        </div>
                        <div class="col p-4 flex-column position-static">
                            <div class="d-flex justify-content-between">
                                <strong
                                    class="d-inline-block mb-2 badge bg-primary-subtle text-primary-emphasis rounded-pill text-uppercase">Oficial</strong>
                                <div class="mb-1 text-body-secondary" id="datetime">Fecha de publicación</div>
                            </div>
                            <h3 class="mt-3 mb-2"><a href="/anuncio.html" class="text-reset">Título del Anuncio</a></h3>
                            <p class="card-text mb-auto">
                                Resumen del anuncio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut
                                velit dui.
                            </p>
                            <div class="d-flex align-items-center justify-content-between mt-3">
                                <div class="d-flex align-items-center mb-3 mb-md-0">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-person-circle"></i>
                                        <div class="ms-2">
                                            <a href="#" class="text-reset fs-6">Nombre del usuario</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="me-3">
                                        <i class="bi bi-chat"></i>
                                        <span class="ms-2 fs-6">12</span>
                                    </div>
                                    <div>
                                        <i class="bi bi-hand-thumbs-up"></i>
                                        <span class="ms-2 fs-6">34</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
*/
