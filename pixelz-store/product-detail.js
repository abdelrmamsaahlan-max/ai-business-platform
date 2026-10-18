const products=window.PIXELZ_PRODUCTS||[],id=new URLSearchParams(location.search).get("id"),p=products.find(x=>x.id===id),$=s=>document.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function money(n){return new Intl.NumberFormat("en-EG").format(n)+" ج.م"}
function categoryLabel(v){return ({"Keyboard":"كيبوردات","Mouse":"ماوسات","Mouse pad":"ماوس باد","Headset":"سماعات","Laptop cooler":"تبريد لابتوب"})[v]||v}
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
function fallback(type){return '<div class="product-image-fallback product-image-fallback-large">'+productIconSvg(type)+'<span>صورة المنتج غير متاحة حاليًا</span></div>'}
function readCart(){try{const raw=JSON.parse(localStorage.getItem("pixelz-cart"))||{},clean={};if(!raw||typeof raw!=="object"||Array.isArray(raw))return clean;for(const product of products){const q=Math.floor(Number(raw[product.id])||0);if(q>0)clean[product.id]=Math.min(99,q)}return clean}catch{return {}}}
let cart=readCart(),toastTimer;
function cartCount(){return Object.values(cart).reduce((sum,q)=>sum+(Number(q)||0),0)}
function refreshCartCount(){const badge=$("#cart-count");if(badge)badge.textContent=cartCount()}
function notify(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300)}
function selectedQuantity(){const input=$("#product-quantity"),value=Math.floor(Number(input.value)||1),safe=Math.min(99,Math.max(1,value));input.value=safe;return safe}
function updateBuyLink(){const button=$("#buy-product");if(button)button.href="/checkout.html?buy="+encodeURIComponent(p.id)+"&quantity="+selectedQuantity()}
if(!p)location.replace("/shop.html");else{
 document.title=p.name+" | PIXELZ";
 $("#crumb-name").textContent=p.name;
 $("#gallery-index").textContent="";
 $("#product-badge").textContent=p.badge;
 $("#product-category").textContent=categoryLabel(p.category);
 $("#product-en").textContent=p.en;
 $("#product-title").textContent=p.name;
 $("#product-short").textContent=p.desc;
 $("#product-price").textContent=money(p.price);
 $("#product-details").textContent=p.details;
 $("#product-image").innerHTML=p.image?'<img class="product-main-photo" src="'+esc(p.image)+'" alt="'+esc(p.name)+'" fetchpriority="high">':fallback(p.type);
 $("#spec-rows").innerHTML=p.specs.map(r=>"<tr><th scope=\"row\">"+esc(r[0])+"</th><td>"+esc(r[1])+"</td></tr>").join("");
 const sameCategory=products.filter(x=>x.id!==p.id&&x.category===p.category);
 const related=(sameCategory.length?sameCategory:products.filter(x=>x.id!==p.id)).slice(0,3);
 $("#related-products").innerHTML=related.map(x=>'<a class="related-card" href="/product.html?id='+encodeURIComponent(x.id)+'"><span>'+esc(x.category)+' / PIXELZ</span><b>'+esc(x.name)+'</b><strong>'+money(x.price)+'</strong><i>التفاصيل ↗</i></a>').join("");
 const quantity=$("#product-quantity");
 $("#quantity-minus").addEventListener("click",()=>{quantity.value=Math.max(1,selectedQuantity()-1);updateBuyLink()});
 $("#quantity-plus").addEventListener("click",()=>{quantity.value=Math.min(99,selectedQuantity()+1);updateBuyLink()});
 quantity.addEventListener("input",updateBuyLink);
 quantity.addEventListener("change",()=>{selectedQuantity();updateBuyLink()});
 $("#add-product").addEventListener("click",()=>{
   const requested=selectedQuantity(),current=Number(cart[p.id])||0;
   if(current>=99){notify("أقصى كمية للمنتج 99");return}
   cart[p.id]=Math.min(99,current+requested);
   let saved=true;try{localStorage.setItem("pixelz-cart",JSON.stringify(cart))}catch{saved=false}
   refreshCartCount();
   notify(saved?("اتضاف للسلة ✓ — الكمية: "+cart[p.id]):"اتضاف مؤقتًا؛ المتصفح مانع حفظ السلة");
 });
 $("#product-image").addEventListener("error",e=>{if(e.target.tagName==="IMG")e.target.replaceWith(document.createRange().createContextualFragment(fallback(p.type)))},true);
 const photo=$("#product-image").querySelector("img");
 if(photo&&photo.complete&&photo.naturalWidth===0)photo.replaceWith(document.createRange().createContextualFragment(fallback(p.type)));
 refreshCartCount();updateBuyLink();
}