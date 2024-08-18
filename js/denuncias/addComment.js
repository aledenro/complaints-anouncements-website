// tomar el id de la denuncia del url
const url = new URL(window.location.href);
const idDenuncia = url.searchParams.get("id_denuncia");

document
  .getElementById("formComment")
  .addEventListener("submit", function (event) {
    event.preventDefault();

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
  });
