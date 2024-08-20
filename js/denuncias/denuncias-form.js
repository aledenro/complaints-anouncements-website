const btnEnviar = document.getElementById("btnEnviar");
const switchAnonimo = document.getElementById("switchAnonimo");
const tituloDenuncia = document.getElementById("tituloDenuncia");
const selectCategoria = document.getElementById("selectCategoria");
const selectProvincia = document.getElementById("selectProvincia");
const selectCanton = document.getElementById("selectCanton");
const selectDistrito = document.getElementById("selectDistrito");
const descripcion = document.getElementById("descripcion");
const imgDenuncia = document.getElementById("imgDenuncia");
const resultado = document.getElementById("resultado");
const error = document.getElementById("error");
const warning = document.getElementById("warning");
let valueSwitchAnonimo;
let valueTituloDenuncia;
let valueSelectCategoria;
let valueSelectProvincia;
let valueSelectCanton;
let valueSelectDistrito;
let valueDescripcion;
let valueImgDenuncia;

function getValues() {
  valueSwitchAnonimo = switchAnonimo.checked ? 1 : 0;
  valueTituloDenuncia = tituloDenuncia.value;
  valueSelectCategoria = selectCategoria.value;
  valueSelectProvincia = selectProvincia.value;
  valueSelectCanton = selectCanton.value;
  valueSelectDistrito = selectDistrito.value;
  valueDescripcion = descripcion.value;
  valueImgDenuncia = imgDenuncia.files[0];
}

function validateValuesBeforeInsert() {
  const invalid =
    valueTituloDenuncia === "" ||
    valueSelectCategoria === "0" ||
    valueSelectProvincia === "0" ||
    valueSelectCanton === "0" ||
    valueSelectDistrito === "0" ||
    valueDescripcion === "";

  return invalid;
}

function hideAlerts() {
  resultado.hidden = true;
  error.hidden = true;
  warning.hidden = true;
}

function setBlankValues() {
  switchAnonimo.checked = false;
  tituloDenuncia.value = "";
  selectCategoria.value = "0";
  selectProvincia.value = "0";
  selectCanton.value = "0";
  selectDistrito.value = "0";
  descripcion.value = "";
  imgDenuncia.value = "";
}

function insertarDenuncia() {
  return fetch("/php/setDenuncias.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isAnonimo: valueSwitchAnonimo,
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
  const confirmAdd = confirm(
    'Seleccione "OK" para agregar la denuncia. Presione "Cancel" para seguir modificando la denuncia.'
  );

  if (confirmAdd === true) {
    hideAlerts();
    getValues();
    const invalid = validateValuesBeforeInsert();

    if (!invalid) {
      const id = await insertarDenuncia();
      // console.log(id);
      if (valueImgDenuncia != undefined && valueImgDenuncia != "") {
        url = await uploadImage(id, valueImgDenuncia, "denuncia");
        updated = await updateUrlImg(id, url);
      }

      if (id) {
        resultado.hidden = false;
        setBlankValues();
      } else {
        error.hidden = false;
      }
    } else {
      warning.hidden = false;
    }
  }
}

btnEnviar.addEventListener("click", main);
