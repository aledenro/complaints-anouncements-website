document.getElementById("searchButton").addEventListener("click", function () {
  const keyword = document.getElementById("searchInput").value;

  fetch(`search.php?keyword=${keyword}`)
    .then((response) => response.json())
    .then((data) => {
      const resultsContainer = document.getElementById("resultsContainer");
      resultsContainer.innerHTML = "";

      data.forEach((item) => {
        const resultDiv = document.createElement("div");
        resultDiv.className = "result";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        const date = document.createElement("p");
        date.textContent = `Publicado el: ${item.publication_date}`;

        resultDiv.appendChild(title);
        resultDiv.appendChild(description);
        resultDiv.appendChild(date);

        resultsContainer.appendChild(resultDiv);
      });
    });
});
