!async function(){const e=document.querySelector(".spinners-container");for(let n=1;n<=20;n++){const n=document.createElement("article");n.classList.add("spinner-article"),e.append(n)}const n=await fetch("https://vanillaloaders.herokuapp.com/",{mode:"cors"}),t=await n.json(),c=document.querySelectorAll(".spinner-article");t.forEach(((e,n)=>{c[n].append(e)})),document.querySelector(".select-shape").addEventListener("change",(function(){console.log(this)}))}();