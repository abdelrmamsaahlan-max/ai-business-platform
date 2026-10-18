const products=window.PIXELZ_PRODUCTS||[],id=new URLSearchParams(location.search).get("id"),p=products.find(x=>x.id===id),$=s=>document.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function money(n){return new Intl.NumberFormat("en-EG").format(n)+" ج.م"}
function fallback(type){return type==="cooler"?'<div class="gear-art art-cooler"><span>ICE / 08</span><i></i><i></i><i></i><i></i></div>':type==="keyboard"?'<div class="gear-art art-keyboard">'+Array.from({length:24},()=>'<i></i>').join("")+'</div>':type==="mouse"?'<div class="gear-art art-mouse"></div>':type==="pad"?'<div class="gear-art art-pad"><span class="pad-word">PZ /</span><b>PIXELZ</b><span class="pad-caption">تصوير توضيحي</span></div>':'<div class="gear-art art-headset"></div>'}
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
 $("#gallery-index").textContent="PZ / "+String(products.indexOf(p)+1).padStart(2,"0");
 $("#product-badge").textContent=p.badge;
 $("#product-category").textContent=p.category;
 $("#product-en").textContent=p.en;
 $("#product-title").textContent=p.name;
 $("#product-short").textContent=p.desc;
 $("#product-price").textContent=money(p.price);
 $("#product-details").textContent=p.details;
 $("#product-image").innerHTML=p.image?'<img class="product-main-photo" src="'+esc(p.image)+'" alt="'+esc(p.name)+'" fetchpriority="high" referrerpolicy="no-referrer">':fallback(p.type);
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