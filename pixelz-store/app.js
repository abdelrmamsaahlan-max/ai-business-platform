const products=window.PIXELZ_PRODUCTS||[];
let cart=normaliseCart(load("pixelz-cart",{})),filter="all",query="";
const $=s=>document.querySelector(s);
function load(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}}
function price(n){return new Intl.NumberFormat("en-EG").format(n)+" ج.م"}
function categoryLabel(v){return ({"Keyboard":"كيبوردات","Mouse":"ماوسات","Mouse pad":"ماوس باد","Headset":"سماعات","Laptop cooler":"تبريد لابتوب"})[v]||v}
function normalizeSearch(v){return String(v??"").normalize("NFKC").toLocaleLowerCase("ar-EG").replace(/[\u064B-\u065F\u0670\u0640]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").trim()}
function searchAliases(p){return ({keyboard:"keyboard key board كيبورد كيبوردات لوحة مفاتيح",mouse:"mouse ماوس ماوسات فأره",pad:"pad mousepad mouse pad ماوس باد ماوسباد جل",headset:"headset headphone headphones سماعه سماعات هيدفون هيدسيت gaming audio",cooler:"cooler cooling laptop cooler تبريد قاعدة تبريد مروحة لابتوب"})[p.type]||""}
function matchesQuery(p){const hay=normalizeSearch([p.name,p.en,p.desc,p.details,p.category,categoryLabel(p.category),p.badge,...(p.specs||[]).flat(),searchAliases(p)].join(" "));return normalizeSearch(query).split(/\s+/).filter(Boolean).every(t=>hay.includes(t))}
function normaliseCart(value){
  if(!value||typeof value!=="object"||Array.isArray(value))return {};
  const clean={};
  for(const p of products){
    const n=Math.floor(Number(value[p.id])||0);
    if(n>0)clean[p.id]=Math.min(n,99);
  }
  return clean;
}
function save(){
  let persisted=true;
  try{localStorage.setItem("pixelz-cart",JSON.stringify(cart))}catch{persisted=false}
  renderCart();
  return persisted;
}
function productIconSvg(type){
 const drawings={
  keyboard:'<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M5 9h.01M8 9h.01M11 9h.01M14 9h.01M17 9h.01M20 9h.01M5 12h.01M8 12h.01M11 12h.01M14 12h.01M17 12h.01M6 15h12"/>',
  mouse:'<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 2v6"/>',
  pad:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M5 7h14"/>',
  headset:'<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="3" y="13" width="4" height="7" rx="2"/><rect x="17" y="13" width="4" height="7" rx="2"/>',
  cooler:'<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><path d="M8 9v6M5 12h6M16 9v6M13 12h6"/>',
  all:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
 };
 const shape=drawings[type]||drawings.all;
 return '<svg class="product-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+shape+'</svg>';
}
function fallback(type){return '<div class="product-image-fallback">'+productIconSvg(type)+'<span>صورة المنتج غير متاحة حاليًا</span></div>'}
function art(p){if(p.image)return '<img class="product-photo" src="'+p.image+'" alt="رسم توضيحي لفئة '+categoryLabel(p.category)+'، وليس صورة فعلية للموديل" loading="lazy" decoding="async">';return fallback(p.type)}
function qty(){return Object.values(cart).reduce((s,n)=>s+(Number(n)||0),0)}
function render(){
const shown=products.filter(p=>(filter==="all"||p.category===filter)&&matchesQuery(p));
$("#result-count").textContent=shown.length+" "+(shown.length===1?"منتج":"منتجات");
$("#product-grid").innerHTML=shown.length?shown.map((p,i)=>'<article class="product-card"><a class="card-main" href="/product.html?id='+encodeURIComponent(p.id)+'"><div class="product-visual '+p.type+'">'+art(p)+'</div><div class="product-topline"><span class="product-category">'+categoryLabel(p.category)+'</span></div><h3>'+p.name+'</h3><p class="product-desc">'+p.desc+'</p></a><div class="product-meta"><span>السعر</span><b>'+price(p.price)+'</b></div><div class="product-actions"><button class="add-button" data-add="'+p.id+'">ضيف للسلة <span>＋</span></button><a class="details-button" href="/product.html?id='+encodeURIComponent(p.id)+'" aria-label="تفاصيل '+p.name+'">التفاصيل ↗</a></div></article>').join(""):'<div class="empty-state"><b>ملقيناش حاجة بالبحث ده</b><p>جرّب اسم تاني أو اختار تصنيف مختلف.</p></div>';
}
function filterBy(v){filter=v;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b.dataset.filter===v));render()}
function renderCart(){
$("#cart-count").textContent=qty();$("#cart-title-count").textContent="("+qty()+")";
const items=products.filter(p=>Number(cart[p.id])>0);
$("#cart-items").innerHTML=items.map(p=>'<div class="cart-row" data-id="'+p.id+'"><div class="cart-thumb">'+(p.image?'<img src="'+p.image+'" alt="" loading="lazy" decoding="async">':productIconSvg(p.type))+'</div><div><h3>'+p.name+'</h3><p>'+price(p.price)+' للقطعة</p><div class="cart-controls"><div class="qty-control"><button data-qty="-1" data-id="'+p.id+'" aria-label="قلل الكمية">−</button><b>'+Number(cart[p.id])+'</b><button data-qty="1" data-id="'+p.id+'" aria-label="زود الكمية">+</button></div><button class="remove-item" data-remove="'+p.id+'">شيل</button></div></div><b class="cart-line-price">'+price(p.price*Number(cart[p.id]))+'</b></div>').join("");
$("#cart-subtotal").textContent=price(items.reduce((s,p)=>s+p.price*Number(cart[p.id]),0));
$("#cart-empty").hidden=items.length>0;$("#cart-items").hidden=!items.length;$("#cart-sum").hidden=!items.length;$("#checkout-open").disabled=!items.length;
}
function open(){ $("#cart-overlay").hidden=false;document.body.classList.add("locked")}
function close(){ $("#cart-overlay").hidden=true;document.body.classList.remove("locked")}
function add(id){
  if(window.PIXELZ_PREVIEW_MODE){notify("المتجر للمعاينة فقط حاليًا؛ الطلبات متوقفة.");return}
  if(!products.some(p=>p.id===id))return;
  if((Number(cart[id])||0)>=99){notify("أقصى كمية للمنتج 99");return}
  cart[id]=Math.floor(Number(cart[id])||0)+1;
  const persisted=save();
  notify(persisted?"اتضاف للسلة ✓":"اتضاف مؤقتًا؛ المتصفح مانع حفظ السلة");
}
let toastTimer;
function notify(message){
  const t=$("#toast");t.textContent=message;t.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}
function syncCatalogCounts(){
  document.querySelectorAll("[data-category-count]").forEach(el=>{
    const key=el.dataset.categoryCount;
    const count=key==="all"?products.length:products.filter(p=>p.category===key).length;
    el.textContent=String(count).padStart(2,"0");
  });
  const total=$("#catalog-total");
  if(total)total.textContent=String(products.length);
}
$("#filter-inline").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b)filterBy(b.dataset.filter)});
document.querySelector(".category-list").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b){filterBy(b.dataset.filter);$("#shop").scrollIntoView({behavior:"smooth"})}});
$("#product-grid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b){e.preventDefault();add(b.dataset.add)}});
$("#product-grid").addEventListener("error",e=>{const img=e.target.closest(".product-photo");if(img){const visual=img.closest(".product-visual"),type=visual&&["keyboard","mouse","pad","headset","cooler"].find(t=>visual.classList.contains(t))||"headset";img.replaceWith(document.createRange().createContextualFragment(fallback(type)))}},true);
function search(v){query=v;$("#search-input").value=v;$("#grid-search").value=v;render()}
$("#search-input").addEventListener("input",e=>search(e.target.value));$("#grid-search").addEventListener("input",e=>search(e.target.value));
$("#open-cart").addEventListener("click",open);$("#close-cart").addEventListener("click",close);$("#keep-shopping").addEventListener("click",close);$("#checkout-open").addEventListener("click",()=>{if(qty())location.href="/checkout.html"});
$("#cart-items").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){let n=Math.floor(Number(cart[q.dataset.id])||0)+Number(q.dataset.qty);if(n<=0)delete cart[q.dataset.id];else cart[q.dataset.id]=Math.min(99,n);save()}if(r){delete cart[r.dataset.remove];save()}});
$("#menu-toggle").addEventListener("click",()=>{const n=$("#mobile-nav"),openNow=n.hidden;n.hidden=!openNow;$("#menu-toggle").setAttribute("aria-expanded",String(openNow));$("#menu-toggle").textContent=openNow?"×":"☰"});
document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{$("#mobile-nav").hidden=true;$("#menu-toggle").setAttribute("aria-expanded","false");$("#menu-toggle").textContent="☰"}));
$("#cart-overlay").addEventListener("click",e=>{if(e.target===$("#cart-overlay"))close()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#cart-overlay").hidden)close()});
const observer="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in-view");observer.unobserve(x.target)}}),{threshold:.12}):null;
const baseRender=render;render=function(){baseRender();if(window.PIXELZ_PREVIEW_MODE)document.querySelectorAll("#product-grid [data-add]").forEach(b=>{b.disabled=true;b.textContent="الطلب متوقف"});if(observer)document.querySelectorAll(".product-card:not(.in-view)").forEach(c=>observer.observe(c));else document.querySelectorAll(".product-card").forEach(c=>c.classList.add("in-view"))};
$("#cart-items").addEventListener("error",e=>{
  const img=e.target.closest("img");
  if(img&&img.parentElement.classList.contains("cart-thumb")){
    const mark=document.createElement("span");mark.className="cart-thumb-fallback";const row=img.closest(".cart-row"),item=products.find(p=>p.id===row?.dataset.id);mark.innerHTML=productIconSvg(item?.type||"all");mark.setAttribute("aria-hidden","true");img.replaceWith(mark);
  }
},true);
const heroMain=$(".hero-image-frame img");
if(heroMain){
  const useHeroFallback=()=>{
    if(heroMain.dataset.fallbackUsed)return;
    heroMain.dataset.fallbackUsed="1";
    const frame=heroMain.parentElement;
    heroMain.remove();frame.classList.add("image-fallback");
    frame.insertAdjacentHTML("beforeend",fallback("keyboard"));
  };
  heroMain.addEventListener("error",useHeroFallback,{once:true});
  if(heroMain.complete&&heroMain.naturalWidth===0)useHeroFallback();
}
const promoImage=$(".hero-promo-card img");
if(promoImage){
  const usePromoFallback=()=>{
    const mark=document.createElement("span");mark.className="promo-image-placeholder";mark.innerHTML=productIconSvg("all");
    promoImage.replaceWith(mark);
  };
  promoImage.addEventListener("error",usePromoFallback,{once:true});
  if(promoImage.complete&&promoImage.naturalWidth===0)usePromoFallback();
}
const initialQuery=new URLSearchParams(location.search).get("q")||"";if(initialQuery){query=initialQuery;$("#search-input").value=initialQuery;$("#grid-search").value=initialQuery}syncCatalogCounts();render();renderCart();if(new URLSearchParams(location.search).get("cart")==="open")open();