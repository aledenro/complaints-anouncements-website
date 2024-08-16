const btnEnviar = document.getElementById("btnEnviar");
const switchOficial = document.getElementById("switchOficial");
const tituloDenuncia = document.getElementById("tituloDenuncia");
const selectCategoria = document.getElementById("selectCategoria");
const selectProvincia = document.getElementById("selectProvincia");
const selectCanton = document.getElementById("selectCanton");
const selectDistrito = document.getElementById("selectDistrito");
const descripcion = document.getElementById("descripcion");
const imgDenuncia = document.getElementById("imgDenuncia");
let valueSwitchOficial;
let valueTituloDenuncia;
let valueSelectCategoria;
let valueSelectProvincia;
let valueSelectCanton;
let valueSelectDistrito;
let valueDescripcion;
let valueImgDenuncia;

function getValues() {
  valueSwitchOficial = switchOficial.checked ? 1 : 0;
  valueTituloDenuncia = tituloDenuncia.value;
  valueSelectCategoria = selectCategoria.value;
  valueSelectProvincia = selectProvincia.value;
  valueSelectCanton = selectCanton.value;
  valueSelectDistrito = selectDistrito.value;
  valueDescripcion = descripcion.value;
  valueImgDenuncia = imgDenuncia.files[0];
}

function insertarAnuncio() {
  getValues();
  return fetch("/php/setAnuncios.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oficial: valueSwitchOficial,
      titulo: valueTituloDenuncia,
      categoria: valueSelectCategoria,
      provincia: valueSelectProvincia,
      canton: valueSelectCanton,
      distrito: valueSelectDistrito,
      descripcion: valueDescripcion,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
}

function updateUrlImg(id_anuncio, url) {
  return fetch("/php/updateUrlImgAnuncio.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_anuncio: id_anuncio,
      url: url,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
}

async function main() {
  const id = await insertarAnuncio();
  url = await uploadImage(id, valueImgDenuncia);
  updated = await updateUrlImg(id, url);
  console.log(updated);
}

btnEnviar.addEventListener("click", main);
