// seleccionar los select del html por id
const provinciaSelect = document.getElementById("selectProvincia");
const cantonSelect = document.getElementById("selectCanton");
const distritoSelect = document.getElementById("selectDistrito");

/* fetch data desde php, se le pasa la accion 
y id y devuelve locaciones*/
async function fetchData(action, id) {
  const response = await fetch(
    `/php/getLocations.php?action=${action}&id=${id}`
  );
  const data = await response.json();
  return data;
}

// llenar el select de provincias
async function populateSelectProvincia(element, data) {
  element.innerHTML = "";
  // para que "provincia" sea la opcion por defecto
  const defaultOption = document.createElement("option");
  defaultOption.value = "0";
  defaultOption.text = "Provincia"; // sustituir por posicion 0 en array
  defaultOption.selected = true;
  element.appendChild(defaultOption);
  // llenar nombres de las provincias por cada option
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id_Provincia;
    option.text = item.Nombre;
    element.appendChild(option);
  });
}

// llenar el select de cantones
async function populateSelectCanton(element, data) {
  element.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "0";
  defaultOption.text = "Cantón"; // sustituir por posicion 0 en array
  defaultOption.selected = true;
  element.appendChild(defaultOption);
  // llenar nombres de los cantones por cada option
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id_Canton;
    option.text = item.Nombre;

    element.appendChild(option);
  });
}

// llenar el select de distritos
async function populateSelectDistrito(element, data) {
  element.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "0";
  defaultOption.text = "Distrito"; // sustituir por posicion 0 en array
  defaultOption.selected = true;
  // llenar nombres de los distritos por cada option
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id_Distrito;
    option.text = item.Nombre;
    // console.log(option);
    element.appendChild(option);
  });
}

// fetch provincias y llenar select
fetchData("get_provincias")
  .then((data) => populateSelectProvincia(provinciaSelect, data))
  .catch((error) => console.error(error));

/* event listener para pasar id de provincia y obtener 
 cantones, fetch cantones y llenar select*/
provinciaSelect.addEventListener("change", (event) => {
  const provinciaId = event.target.value;
  // console.log("ID de Provincia Seleccionada:", provinciaId);
  fetchData("get_cantones", provinciaId)
    .then((data) => populateSelectCanton(cantonSelect, data))
    .catch((error) => console.error(error));
});

/* event listener para pasar id de canton y obtener 
 distritos, fetch cantones y llenar select*/
cantonSelect.addEventListener("change", (event) => {
  const cantonId = event.target.value;
  fetchData("get_distritos", cantonId)
    .then((data) => populateSelectDistrito(distritoSelect, data))
    .catch((error) => console.error(error));
});
