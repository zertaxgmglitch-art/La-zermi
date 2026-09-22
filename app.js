const products=[
{name:"Filtrée 90U",tag:"90 micron",desc:"Bloc brun compact. La mention « 90U » est présentée sur le visuel."},
{name:"Monster Calimousse – Papaya",tag:"Summer Edition",desc:"Produit emballé avec mentions Papaya, Summer Edition et Cali Genetics."},
{name:"Super Lemon Dry",tag:"Collection Lemon",desc:"Nom affiché Super Lemon Dry, avec présentation visuelle associée au citron."},
{name:"Purple Kush",tag:"Collection Purple",desc:"Fleurs présentées en sachet. Le nom seul ne permet pas d’authentifier la variété."}
]; let fav=JSON.parse(localStorage.getItem("lzfav")||"[]");
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function go(id){$$(".page").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");scrollTo(0,0);if(id==="favorites")renderFav()}
$$("[data-page]").forEach(b=>b.onclick=()=>go(b.dataset.page));
function card(p,i){return `<article class="card" data-i="${i}"><div class="art">${String(i+1).padStart(2,"0")}</div><div class="body"><button class="fav" data-f="${i}">${fav.includes(i)?"♥":"♡"}</button><h3>${p.name}</h3><p>${p.tag}</p><button class="more">VOIR LA FICHE →</button></div></article>`}
function render(list=products){$("#cards").innerHTML=list.map(p=>card(p,products.indexOf(p))).join("");wire()}
function wire(){$$(".fav").forEach(b=>b.onclick=e=>{e.stopPropagation();let i=+b.dataset.f;fav=fav.includes(i)?fav.filter(x=>x!==i):[...fav,i];localStorage.setItem("lzfav",JSON.stringify(fav));render(products.filter(p=>p.name.toLowerCase().includes($("#search").value.toLowerCase())))});$$(".card .more").forEach(b=>b.onclick=()=>detail(+b.closest(".card").dataset.i))}
function renderFav(){let el=$("#favCards");el.innerHTML=fav.map(i=>card(products[i],i)).join("");$("#emptyFav").style.display=fav.length?"none":"block";wire()}
function detail(i){let p=products[i];$("#detail").innerHTML=`<div class="detailHero">${String(i+1).padStart(2,"0")}</div><h1>${p.name}</h1><h3>${p.tag}</h3><p>${p.desc}</p><div class="panel"><b>À retenir</b><p>Cette fiche décrit uniquement les éléments affichés. Composition, origine, teneur et procédé ne sont pas confirmés.</p></div>`;$("#modal").classList.add("open")}
$("#close").onclick=()=>$("#modal").classList.remove("open");$("#searchBtn").onclick=()=>{go("catalog");$("#search").focus()};$("#search").oninput=e=>render(products.filter(p=>p.name.toLowerCase().includes(e.target.value.toLowerCase())));
const tracks=["track1.mp3","track2.mp3","track3.mp3","track4.mp3"];let ti=0,a=$("#audio");
function load(){a.src="music/"+tracks[ti];$("#track").textContent="Piste "+(ti+1);$("#state").textContent=tracks[ti]}
$("#play").onclick=()=>{if(!a.src)load();if(a.paused){a.play().then(()=>{$("#play").textContent="Ⅱ";$("#disc").classList.add("spin")}).catch(()=>$("#state").textContent="Ajoute le fichier "+tracks[ti])}else{a.pause();$("#play").textContent="▶";$("#disc").classList.remove("spin")}};
$("#next").onclick=()=>{ti=(ti+1)%tracks.length;load();a.play().catch(()=>{});$("#disc").classList.add("spin")};$("#prev").onclick=()=>{ti=(ti+tracks.length-1)%tracks.length;load();a.play().catch(()=>{})};$("#disc").onclick=()=>$("#play").click();a.onended=()=>$("#next").click();
render(); if(window.Telegram?.WebApp){Telegram.WebApp.ready();Telegram.WebApp.expand()}