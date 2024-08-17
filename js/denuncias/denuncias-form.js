const resultadoDiv = document.getElementById("resultado");
const errorDiv = document.getElementById("error");
const imgDenuncia = document.getElementById("imgDenuncia");
let valueImgDenuncia;
resultadoDiv.style.display = "none";
errorDiv.style.display = "none";

function updateUrlImg(id_denuncia, url) {
  return fetch("/php/updateUrlImgDenuncia.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_denuncia: id_denuncia,
      url: url,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
}

async function main() {
  valueImgDenuncia = imgDenuncia.files[0];
  console.log("img:", valueImgDenuncia);
  $("#formDenuncia").on("submit", function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.post("/php/setDenuncias.php", formData, async function (data) {
      try {
        const response = JSON.parse(data);

        if (response.success) {
          // se recibe el mensaje json desde php
          $("#resultado").html(response.message);
          resultadoDiv.style.display = "block";
          $("#formDenuncia").trigger("reset");

          const id_denuncia = response.id_denuncia;
          console.log("id:", id_denuncia);
          if (valueImgDenuncia != undefined && valueImgDenuncia != "") {
            url = await uploadImage(id_denuncia, valueImgDenuncia, "denuncia");
            updateUrlImg(id_denuncia, url);
          }
        } else {
          $("#error").html(response.message);
          errorDiv.style.display = "block";
        }
      } catch (e) {
        console.error("Parsing error:", e);
        $("#error").html("Debe completar todos los campos");
        errorDiv.style.display = "block";
      }
    });
  });
}
