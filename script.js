import barba from "@barba/core";
import gsap from "gsap";
import { random } from "gsap/all";

barba.init({
  transitions: [
    {
      name: "home",
      to: { namespace: "home" },
      leave(data) {
        document.querySelector("body").style.backgroundColor = "black";
        data.current.container.style.backgroundColor = "#edf2ff";
        data.next.container.style.backgroundColor = "#edf2ff";
        return gsap.fromTo(
          data.current.container,
          {
            clipPath: "circle(100% at 50% 50%)",
          },
          {
            clipPath: "circle(0% at 50% 50%)",
            duration: 1,
          }
        );
      },
      enter(data) {
        return gsap.fromTo(
          data.next.container,
          {
            clipPath: "circle(0% at 50% 50%)",
          },
          {
            clipPath: "circle(100% at 50% 50%)",
            duration: 1,
          }
        );
      },

      beforeEnter(data) {
        data.current.container.remove();
        document.head.querySelector("script").remove();
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "dist/index.js";
        document.head.append(script);
      },
    },
    {
      name: "instructions",
      to: { namespace: "instructions" },
      leave(data) {
        data.current.container.style.backgroundColor = "#edf2ff";
        data.next.container.style.backgroundColor = "#edf2ff";
        document.querySelector("body").style.backgroundColor = "black";
        return gsap.fromTo(
          data.current.container,
          { clipPath: "circle(100% at 50% 50%)" },
          {
            clipPath: "circle(0%)",
            duration: 1,
          }
        );
      },
      enter(data) {
        return gsap.fromTo(
          data.next.container,
          {
            clipPath: "circle(0% at 50% 50%)",
          },
          {
            clipPath: "circle(100% at 50% 50%)",
            duration: 1,
          }
        );
      },

      beforeEnter(data) {
        data.current.container.remove();
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
})();

(function selectShapeEl() {
  const spinnerElsContainer = document.querySelector(".spinners-container");
  let spinnerEls;
  const selectShapeEl = document.querySelector(".select-shape");

  selectShapeEl.addEventListener("change", async function () {
    spinnerEls =
      document.querySelectorAll(".spinner-article"); /* Update spinnerels */
    spinnerEls.forEach(function (el) {
      el.textContent = "";
      el.classList.add("loading");
    });
    const response = await fetch(
      `https://vanillaloaders.herokuapp.com/loaders?type=${this.value}`
    );

    const loaders = await response.json();

    if (loaders.length > spinnerEls.length) {
      const amountToAdd = loaders.length - spinnerEls.length;
      for (let i = 0; i < amountToAdd; i++) {
        const article = document.createElement("article");
        article.classList.add("spinner-article", "loading");
        spinnerElsContainer.append(article);
      }
    } else if (loaders.length < spinnerEls.length) {
      const amountToRemove = spinnerEls.length - loaders.length;
      for (let i = 0; i < amountToRemove; i++) {
        spinnerElsContainer.removeChild(spinnerElsContainer.lastChild);
      }
    }
    spinnerEls = document.querySelectorAll(".spinner-article");
    spinnerEls.forEach(function (el, i) {
      const loader = loaders[i];
      const anchor = document.createElement("a");
      anchor.classList.add("loader-anchor");
      anchor.href = `https://vanillaloaders.herokuapp.com/loaders/${loader._id}`;
      el.classList.remove("loading");
      el.innerHTML = loader.html;
      el.prepend(anchor);
    });
  });
})();
