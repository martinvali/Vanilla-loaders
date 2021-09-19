(async function () {
  const startingLoaders = await fetch("https://vanillaloaders.herokuapp.com/", {
    mode: "cors",
  });
  const selectShapeEl = document.querySelector(".select-shape");
  selectShapeEl.addEventListener("change", function () {
    console.log(this);
  });
})();
