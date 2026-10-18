const products=window.PIXELZ_PRODUCTS||[],waNumber="201142497622";
let cart=load("pixelz-cart",{}),filter="all",query="";
const $=s=>document.querySelector(s);
function load(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}}
function price(n){return new Intl.NumberFormat("en-EG").format(n)+" ج.م"}
function save(){localStorage.setItem("pixelz-cart",JSON.stringify(cart));renderCart()}
function art(p){if(p.image)return '<img class="product-photo" src="'+p.image+'" alt="'+p.name.replace(/"/g,"&quot;")+'" loading="lazy" decoding="async" referrerpolicy="no-referrer">';return p.type==="pad"?'<div class="gear-art art-pad"><span class="pad-word">PZ /</span><b>PIXELZ</b><span class="pad-caption">تصوير توضيحي</span></div>':'<div class="gear-art art-headset"></div>'}
function qty(){return Object.values(cart).reduce((s,n)=>s+(Number(n)||0),0)}
function render(){
const shown=products.filter(p=>(filter==="all"||p.category===filter)&&(p.name+" "+p.en+" "+p.desc+" "+p.category).toLowerCase().includes(query));
$("#result-count").textContent=shown.length+" "+(shown.length===1?"منتج":"منتجات");
$("#product-grid").innerHTML=shown.length?shown.map((p,i)=>'<article class="product-card"><a class="card-main" href="/product.html?id='+encodeURIComponent(p.id)+'"><div class="product-visual '+p.type+'"><span class="visual-index">PZ / '+String(i+1).padStart(2,"0")+'</span>'+art(p)+'<span class="visual-label">PIXELZ / GEAR STUDY</span></div><div class="product-topline"><span class="product-category">'+p.en.split(" ")[0]+' / '+p.category+'</span><span class="product-badge">'+p.badge+'</span></div><h3>'+p.name+'</h3><p class="product-desc">'+p.desc+'</p></a><div class="product-meta"><span>السعر</span><b>'+price(p.price)+'</b></div><div class="product-actions"><button class="add-button" data-add="'+p.id+'">ضيف للسلة <span>＋</span></button><a class="details-button" href="/product.html?id='+encodeURIComponent(p.id)+'" aria-label="تفاصيل '+p.name+'">التفاصيل ↗</a></div></article>').join(""):'<div class="empty-state"><b>ملقيناش حاجة بالبحث ده</b><p>جرّب اسم تاني أو اختار تصنيف مختلف.</p></div>';
}
function filterBy(v){filter=v;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b.dataset.filter===v));render()}
function renderCart(){
$("#cart-count").textContent=qty();$("#cart-title-count").textContent="("+qty()+")";
const items=products.filter(p=>Number(cart[p.id])>0);
$("#cart-items").innerHTML=items.map(p=>'<div class="cart-row"><div class="cart-thumb">'+(p.image?'<img src="'+p.image+'" alt="" loading="lazy">':'<span>PZ.</span>')+'</div><div><h3>'+p.name+'</h3><p>'+price(p.price)+' للقطعة</p><div class="cart-controls"><div class="qty-control"><button data-qty="-1" data-id="'+p.id+'" aria-label="قلل الكمية">−</button><b>'+Number(cart[p.id])+'</b><button data-qty="1" data-id="'+p.id+'" aria-label="زود الكمية">+</button></div><button class="remove-item" data-remove="'+p.id+'">شيل</button></div></div><b class="cart-line-price">'+price(p.price*Number(cart[p.id]))+'</b></div>').join("");
$("#cart-subtotal").textContent=price(items.reduce((s,p)=>s+p.price*Number(cart[p.id]),0));
$("#cart-empty").hidden=items.length>0;$("#cart-items").hidden=!items.length;$("#cart-sum").hidden=!items.length;$("#checkout-open").disabled=!items.length;
}
function open(){ $("#cart-overlay").hidden=false;document.body.classList.add("locked")}
function close(){ $("#cart-overlay").hidden=true;document.body.classList.remove("locked")}
function add(id){if(!products.some(p=>p.id===id))return;cart[id]=(Number(cart[id])||0)+1;save();const t=$("#toast");t.textContent="اتضاف للسلة ✓";t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1600)}
$("#filter-inline").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b)filterBy(b.dataset.filter)});
document.querySelector(".category-list").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b){filterBy(b.dataset.filter);$("#shop").scrollIntoView({behavior:"smooth"})}});
$("#product-grid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b){e.preventDefault();add(b.dataset.add)}});
$("#product-grid").addEventListener("error",e=>{const img=e.target.closest(".product-photo");if(img){const visual=img.closest(".product-visual");if(visual&&visual.classList.contains("pad"))img.replaceWith(document.createRange().createContextualFragment(art({type:"pad"}))) }},true);
function search(v){query=v.trim().toLowerCase();$("#search-input").value=v;$("#grid-search").value=v;render()}
$("#search-input").addEventListener("input",e=>search(e.target.value));$("#grid-search").addEventListener("input",e=>search(e.target.value));
$("#open-cart").addEventListener("click",open);$("#close-cart").addEventListener("click",close);$("#keep-shopping").addEventListener("click",close);$("#checkout-open").addEventListener("click",()=>{if(qty())location.href="/checkout.html"});
$("#cart-items").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){let n=(Number(cart[q.dataset.id])||0)+Number(q.dataset.qty);if(n<=0)delete cart[q.dataset.id];else cart[q.dataset.id]=n;save()}if(r){delete cart[r.dataset.remove];save()}});
$("#menu-toggle").addEventListener("click",()=>{const n=$("#mobile-nav"),openNow=n.hidden;n.hidden=!openNow;$("#menu-toggle").setAttribute("aria-expanded",String(openNow));$("#menu-toggle").textContent=openNow?"×":"☰"});
document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{$("#mobile-nav").hidden=true;$("#menu-toggle").setAttribute("aria-expanded","false");$("#menu-toggle").textContent="☰"}));
$("#cart-overlay").addEventListener("click",e=>{if(e.target===$("#cart-overlay"))close()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#cart-overlay").hidden)close()});
const observer="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in-view");observer.unobserve(x.target)}}),{threshold:.12}):null;
const baseRender=render;render=function(){baseRender();if(observer)document.querySelectorAll(".product-card:not(.in-view)").forEach(c=>observer.observe(c));else document.querySelectorAll(".product-card").forEach(c=>c.classList.add("in-view"))};
render();renderCart();if(new URLSearchParams(location.search).get("cart")==="open")open();