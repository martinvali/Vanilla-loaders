import barba from "@barba/core";
import gsap from "gsap";

barba.init({
  transitions: [
    {
      name: "opacity",
      leave(data) {
        console.log("hlevae");
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 2,
        });
      },
      enter(data) {
        console.log("henter");

        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 2,
        });
      },
    },
  ],
});
(async function () {
  const dataContainer = document.querySelector(".spinners-container");

  for (let i = 1; i <= 20; i++) {
    const article = document.createElement("article");

    article.classList.add("spinner-article", "loading");
    dataContainer.append(article);
  }
  const startingLoaders = await fetch("https://vanillaloaders.herokuapp.com/", {
    mode: "cors",
  });
  const data = await startingLoaders.json();
  const articles = document.querySelectorAll(".spinner-article");
  data.forEach((element, index) => {
    const article = articles[index];
    const anchor = document.createElement("a");
    anchor.classList.add("loader-anchor");
    anchor.href = `https://vanillaloaders.herokuapp.com/loaders/${element._id}`;
    article.classList.remove("loading");
    article.innerHTML = element.html;
    article.prepend(anchor);
  });
  const selectShapeEl = document.querySelector(".select-shape");
  selectShapeEl.addEventListener("change", function () {
    console.log(this);
  });
})();
