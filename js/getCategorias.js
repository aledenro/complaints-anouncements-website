function llenarCategorias() {
  fetch(`/php/getCategoriasDenuncia.php`)
    .then((response) => response.json())
    .then((data) => {
      const element = document.getElementById("selectCategoria");
      const categorias = data.Categorias;

      element.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Categoria";
      defaultOption.selected = true;
      element.appendChild(defaultOption);

      console.log(categorias);

      categorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria.id_CategoriaDenuncia;
        option.text = categoria.nombre;
        element.appendChild(option);
        console.log(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
}

document.addEventListener("DOMContentLoaded", llenarCategorias);
