// Construir json para api request
const data = {
  query: {
    $query: {
      $and: [
        {
          conceptUri: "http://en.wikipedia.org/wiki/Costa_Rica",
        },
        {
          locationUri: "http://en.wikipedia.org/wiki/Costa_Rica",
        },
        {
          lang: "spa",
        },
      ],
    },
    $filter: {
      forceMaxDataTimeWindow: "7",
    },
  },
  resultType: "articles",
  articlesSortBy: "date",
  includeArticleImage: true,
  apiKey: "760dccbc-8ed2-4bb1-838f-7801b0af3d20",
};

const url = "https://newsapi.ai/api/v1/article/getArticles";

// eletemntos html
const tituloNoticia1 = document.getElementById("tituloNoticia1");
const cuerpoNoticia1 = document.getElementById("cuerpoNoticia1");
const datetime = document.getElementById("datetime");
const imgNoticia1 = document.getElementById("imgNoticia1");

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((response) => {
    noticias = response["articles"]["results"];
    tituloNoticia1.innerText = noticias[0]["title"];
    tituloNoticia1.setAttribute("href", noticias[0]["url"]);
    datetime.innerText = noticias[0]["date"];
    imgNoticia1.setAttribute("src", noticias[0]["image"]);
  });
