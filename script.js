import barba from "@barba/core";
import gsap from "gsap";
import { random } from "gsap/all";

barba.init({
  transitions: [
    {
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 2,
        });
      },
      enter(data) {
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
    if (element) {
      anchor.href = `https://vanillaloaders.herokuapp.com/loaders/${element._id}`;
    } else {
      anchor.href = "instructions.html";
    }
    article.classList.remove("loading");
    article.innerHTML = element.html;
    article.prepend(anchor);
  });
})();

(function selectShapeEl() {
  let randomNum;
  const spinnerEls = document.querySelectorAll(".spinner-article");
  const selectShapeEl = document.querySelector(".select-shape");
  selectShapeEl.addEventListener("mouseover", async function () {
    randomNum = Math.floor(Math.random() * 20) + 1;
  });
  selectShapeEl.addEventListener("change", async function () {
    const response = await fetch(
      `https://vanillaloaders.herokuapp.com/loaders?type=${this.value}`
    );

    spinnerEls.forEach(function (el, index) {
      if (index + 1 === randomNum) {
        const innerSpinner = el.querySelector(":not(.loader-anchor)");
        innerSpinner.parentNode.before(innerSpinner);
        console.log(innerSpinner);
      }
      el.remove();
    });

    const loaders = await response.json();
  });
})();
