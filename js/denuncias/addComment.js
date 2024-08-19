// tomar el id de la denuncia del url
const url = new URL(window.location.href);
const idDenuncia = url.searchParams.get("id_denuncia");

function addComment() {
  // obtener comentario del form
  const comentario = document.getElementById("comentario").value;

  // enviar post con los datos
  fetch("/php/setComentarioDenuncia.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      id_denuncia: idDenuncia,
      comentario: comentario,
    }),
  })
    // convertir respiesta a json
    .then((response) => response.json())
    .then((data) => {
      // verificar si se envio y recargar
      if (data.success) {
        window.location.reload();
        // error si algo fallo
      } else {
        alert(data.message); // Muestra mensaje de error
      }
    })
    .catch((error) => console.error("Error:", error));
}

async function mainSubmitComment() {
  const loggedInData = await verifyIfLoggedIn();

  if (!loggedInData["loggedIn"]) {
    const redirectLogin = confirm(
      "Por favor inicie sesión para poder agregar comentarios. Presione 'Aceptar' si desea ser redirigido a la página de log in. Tome en cuenta que si se redirige su comentario se borrará."
    );

    if (redirectLogin) {
      window.location.href = "/otros/login.html";
      return;
    } else {
      return;
    }
  }

  addComment();
}

document
  .getElementById("formComment")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    mainSubmitComment();
  });
