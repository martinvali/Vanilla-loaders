!async function(){const e=document.querySelector(".spinners-container");for(let n=1;n<=20;n++){const n=document.createElement("article");n.classList.add("spinner-article","loading"),e.append(n)}const n=await fetch("https://vanillaloaders.herokuapp.com/",{mode:"cors"}),t=await n.json(),a=document.querySelectorAll(".spinner-article");t.forEach(((e,n)=>{const t=a[n],o=document.createElement("a");o.classList.add("loader-anchor"),o.href=`https://vanillaloaders.herokuapp.com/${e._id}}`,t.classList.remove("loading"),t.innerHTML=e.html,t.prepend(o)})),document.querySelector(".select-shape").addEventListener("change",(function(){console.log(this)}))}();