let pokemonRepository=function(){const e=[],t=document.querySelector("#modal-container"),n="https://pokeapi.co/api/v2/pokemon/?limit=150";function o(t){return"object"!=typeof t?"Not an object":"name"in t&&"type"in t&&"weight"in t?"Object doesn't have required properties":void e.push(t)}function i(){spinner.className="show"}function a(){spinner.className="hide"}function s(e,t){e.addEventListener("click",function(e){e.preventDefault(),l(t)})}function l(e){pokemonRepository.loadDetails(e).then(function(){!function(e){let t=$(".modal-body"),n=$(".modal-header"),o=$(".modal-title"),i=$("#btnClose");$("#modal-container").modal("show"),n.empty(),o.empty(),t.empty();let a=$("<h2>"+e.name+"</h2>"),s=$("<img class='modal-img'>");s.attr("src",e.imageUrl);let l=$("<p>Height: "+e.height+" m </p>"),r=$("<p>Weight: "+e.weight+" kg </p>"),c=$("<p>Types: "+e.types+"</p>");n.append(a),t.append(s),t.append(c),t.append(l),t.append(r),n.append(i)}(e)})}function r(e){e.preventDefault(),t.classList.remove("is-visible")}return window.addEventListener("keydown",e=>{"Escape"===e.key&&t.classList.contains("is-visible")&&r(e)}),t.addEventListener("click",e=>{e.target===t&&r(e)}),{getAll:function(){return e},add:o,addListItem:function(e){let t=document.querySelector(".pokemon-list"),n=document.createElement("list-item");n.classList.add("group-list-item");let o=document.createElement("button");o.innerText=e.name,o.classList.add("btn-sm","btn-dark","nameButton"),s(o,e),n.appendChild(o),t.appendChild(n)},addListener:s,loadList:async function(){try{i();const e=await fetch(n);(await e.json()).results.forEach(function(e){o({name:e.name,detailsUrl:e.url})}),a()}catch(e){a(),console.error(e)}},loadDetails:async function(e){const t=e.detailsUrl;try{i();const n=await fetch(t),o=await n.json();e.imageUrl=o.sprites.other.dream_world.front_default,e.weight=o.weight,e.height=o.height,e.types=[];for(let t=0;t<o.types.length;t++)e.types.push(" "+o.types[t].type.name);a()}catch(e){a(),console.error(e)}},showDetails:l}}();function searchPokemon(){let e=document.querySelector("#pokemon-search").value.toLowerCase(),t=document.querySelectorAll("list-item");for(let n=0;n<t.length;n++){t[n].innerText.toLowerCase().indexOf(e)>-1?t[n].style.display="":t[n].style.display="none"}}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})}),windows.addEventListener("keydown",function(e){"13"==e.keyCode&&e.preventDefault()});
