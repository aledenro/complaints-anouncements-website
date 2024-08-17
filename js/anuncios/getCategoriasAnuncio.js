function llenarCategorias() {
  fetch(`/php/getCategoriasAnuncio.php`)
    .then((response) => response.json())
    .then((data) => {
      const element = document.getElementById("selectCategoria");
      const categorias = data.Categorias;

      element.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "0";
      defaultOption.text = "Categoria";
      defaultOption.selected = true;
      element.appendChild(defaultOption);

      categorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria["id_CategoriaAnuncio"];
        option.text = categoria.nombre;
        element.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
}

document.addEventListener("DOMContentLoaded", llenarCategorias);
