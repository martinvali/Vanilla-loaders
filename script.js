import barba from "@barba/core";
import gsap from "gsap";
import { random } from "gsap/all";

let controller;

barba.init({
  transitions: [
    {
      name: "home",
      to: { namespace: "home" },
      leave(data) {
        document.querySelector("body").style.backgroundColor = "#4263eb";
        data.current.container.style.backgroundColor = "#edf2ff";
        data.next.container.style.backgroundColor = "#edf2ff";
        return gsap.fromTo(
          data.current.container,
          {
            //   clipPath: "rectangle(100% at 50vw 50vh)",
            transform: "translateX(0)",
          },
          {
            //  clipPath: "rectangle(0% at 50vw 50vh)",
            transform: "translateX(-100vw)",
            duration: 0.5,
          }
        );
      },
      enter(data) {
        return gsap.fromTo(
          data.next.container,
          {
            // clipPath: "rectangle(0% at 50vw 50vh)",
            transform: "translateX(-100vw)",
          },
          {
            //clipPath: "rectangle(100% at 50vw 50vh)",
            transform: "translateX(0)",
            duration: 0.5,
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
      afterEnter() {
        document.querySelector("body").style.backgroundColor = "#edf2ff";
      },
    },
    {
      name: "instructions",
      to: { namespace: "instructions" },
      leave(data) {
        data.current.container.style.backgroundColor = "#edf2ff";
        data.next.container.style.backgroundColor = "#edf2ff";
        document.querySelector("body").style.backgroundColor = "#4263eb";
        return gsap.fromTo(
          data.current.container,
          {
            transform: "translateX(0)",
          },
          {
            transform: "translateX(-100vw)",
            duration: 0.5,
          }
        );
      },
      enter(data) {
        return gsap.fromTo(
          data.next.container,
          {
            transform: "translateX(-100vw)",
          },
          {
            transform: "translateX(0vw)",
            duration: 0.5,
          }
        );
      },

      beforeEnter(data) {
        data.current.container.remove();
      },
      afterEnter() {
        document.querySelector("body").style.backgroundColor = "#edf2ff";
      },
    },
  ],
});

(async function () {
  const dataContainer = document.querySelector(".spinners-container");
  controller = new AbortController();
  const signal = controller.signal;
  for (let i = 1; i <= 20; i++) {
    const article = document.createElement("article");

    article.classList.add("spinner-article", "loading");
    dataContainer.append(article);
  }
  const startingLoaders = await fetch("https://vanillaloaders.herokuapp.com/", {
    mode: "cors",
    signal,
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
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const signal = controller.signal;
    spinnerEls =
      document.querySelectorAll(".spinner-article"); /* Update spinnerels */
    spinnerEls.forEach(function (el) {
      el.textContent = "";
      el.classList.add("loading");
    });
    const response = await fetch(
      `https://vanillaloaders.herokuapp.com/loaders?type=${this.value}`,
      { signal }
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
