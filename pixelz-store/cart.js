const products=window.PIXELZ_PRODUCTS||[];
const $=s=>document.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>new Intl.NumberFormat("en-EG").format(n)+" ج.م";
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
let cart=readCart(),toastTimer;
function readCart(){try{const raw=JSON.parse(localStorage.getItem("pixelz-cart"))||{},clean={};if(!raw||typeof raw!=="object"||Array.isArray(raw))return clean;for(const p of products){const q=Math.floor(Number(raw[p.id])||0);if(q>0)clean[p.id]=Math.min(99,q)}return clean}catch{return {}}}
function saveCart(){try{localStorage.setItem("pixelz-cart",JSON.stringify(cart));$("#cart-storage-note").textContent=""}catch{$("#cart-storage-note").textContent="المتصفح مش سامح بحفظ التغييرات؛ السلة هتفضل مؤقتة في الصفحة الحالية."}}
function count(){return Object.values(cart).reduce((s,n)=>s+(Number(n)||0),0)}
function notify(m){const t=$("#cart-page-toast");t.textContent=m;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
function image(p){return p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'" loading="lazy" decoding="async">':productIconSvg(p.type)}
function render(){const items=products.filter(p=>Number(cart[p.id])>0),qty=count(),subtotal=items.reduce((sum,p)=>sum+p.price*cart[p.id],0);$("#cart-page-count").textContent=qty;$("#cart-page-count-title").textContent="("+qty+")";$("#cart-page-qty").textContent=qty;$("#cart-page-subtotal").textContent=money(subtotal);$("#cart-page-total").textContent=money(subtotal);$("#cart-page-empty").hidden=items.length>0;$("#cart-page-items").hidden=items.length===0;$("#cart-clear").hidden=items.length===0;$("#cart-checkout").setAttribute("aria-disabled",String(!items.length));$("#cart-checkout").classList.toggle("is-disabled",!items.length);$("#cart-page-items").innerHTML=items.map(p=>'<article class="cart-page-item" data-cart-row="'+esc(p.id)+'"><div class="cart-page-thumb">'+image(p)+'</div><div class="cart-page-item-main"><a href="/product.html?id='+encodeURIComponent(p.id)+'" class="cart-page-item-name">'+esc(p.name)+'</a><span class="cart-page-item-category">'+esc(p.category)+'</span><b class="cart-page-item-price">'+money(p.price)+' للقطعة</b><div class="qty-control"><button type="button" data-qty="-1" data-id="'+esc(p.id)+'" aria-label="تقليل كمية '+esc(p.name)+'">−</button><b aria-label="الكمية">'+cart[p.id]+'</b><button type="button" data-qty="1" data-id="'+esc(p.id)+'" aria-label="زيادة كمية '+esc(p.name)+'" '+(cart[p.id]>=99?"disabled":"")+'>+</button></div></div><div class="cart-page-item-side"><b>'+money(p.price*cart[p.id])+'</b><button type="button" class="remove-item" data-remove="'+esc(p.id)+'">إزالة</button></div></article>').join("");}
$("#cart-page-items").addEventListener("click",e=>{const qty=e.target.closest("[data-qty]"),remove=e.target.closest("[data-remove]");if(qty){const id=qty.dataset.id;if(!products.some(p=>p.id===id))return;const next=(Number(cart[id])||0)+Number(qty.dataset.qty);if(next<=0)delete cart[id];else cart[id]=Math.min(99,next);saveCart();render()}if(remove){delete cart[remove.dataset.remove];saveCart();render();notify("اتشال المنتج من السلة") }});
$("#cart-clear").addEventListener("click",()=>{cart={};saveCart();render();notify("السلة بقت فاضية")});
$("#cart-checkout").addEventListener("click",e=>{if(!count()){e.preventDefault();return}saveCart()});
$("#cart-page-items").addEventListener("error",e=>{const img=e.target.closest("img");if(img){const mark=document.createElement("span");mark.className="cart-page-image-mark";const row=img.closest("[data-cart-row]"),item=products.find(p=>p.id===row?.dataset.cartRow);mark.innerHTML=productIconSvg(item?.type||"all");img.replaceWith(mark)}},true);
render();