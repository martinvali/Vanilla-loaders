!async function(){const e=document.querySelector(".spinners-container");for(let t=1;t<=20;t++){const t=document.createElement("article");t.classList.add("spinner-article","loading"),e.append(t)}const t=await fetch("https://vanillaloaders.herokuapp.com/",{mode:"cors"}),n=await t.json(),a=document.querySelectorAll(".spinner-article");n.forEach(((e,t)=>{const n=a[t],c=document.createElement("a");c.href=`https://vanilla-loaders.netlify.app/${e._id}}`,c.style.display="block",n.classList.remove("loading"),n.innerHTML=e.html,n.append(c)})),document.querySelector(".select-shape").addEventListener("change",(function(){console.log(this)}))}();