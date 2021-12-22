(async function () {
  const startingLoaders = await fetch("https://vanillaloaders.herokuapp.com/", {
    mode: "cors",
  });
  const data = await startingLoaders.json();
  const dataContainer = document.querySelector(".spinners-container");

  data.forEach((element) => {
    const article = document.createElement("article");
    article.innerHTML = element.html;
    article.classList.add("spinner-article");
    article.style.display = "flex";
    article.style.justifyContent = "center";
    article.style.alignItems = "center";

    dataContainer.append(article);
  });
  const selectShapeEl = document.querySelector(".select-shape");
  selectShapeEl.addEventListener("change", function () {
    console.log(this);
  });
})();
