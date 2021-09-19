(async function () {
  const startingLoaders = await fetch("https://vanillaloaders.herokuapp.com/", {
    mode: "no-cors",
  });
  console.log(startingLoaders);
  const selectShapeEl = document.querySelector(".select-shape");
  selectShapeEl.addEventListener("change", function () {
    console.log(this);
  });
})();
