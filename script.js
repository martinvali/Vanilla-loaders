(async function () {
  for (let i = 1; i <= 20; i++) {
    const dataContainer = document.querySelector(".spinners-container");
    const article = document.createElement("article");
    article.innerHTML = element.html;
    article.classList.add("spinner-article");
    dataContainer.append(article);
  }
  const startingLoaders = await fetch("https://vanillaloaders.herokuapp.com/", {
    mode: "cors",
  });
  const data = await startingLoaders.json();
  const articles = document.querySelectorAll(".spinner-article");
  data.forEach((element, index) => {
    articles[index].append(element);
  });
  const selectShapeEl = document.querySelector(".select-shape");
  selectShapeEl.addEventListener("change", function () {
    console.log(this);
  });
})();
