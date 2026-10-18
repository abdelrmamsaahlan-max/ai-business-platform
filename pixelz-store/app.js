const products=[
{id:"mouse1",name:"Lightweight gaming mouse",category:"Mouse",tag:"PRECISION",desc:"A light mouse concept for quicker, controlled movement.",art:"mouse",detail:"Confirm exact model, sensor, weight, cable or wireless type, battery, warranty and supplier stock."},
{id:"mat1",name:"Extended desk mousepad",category:"Mouse pad",tag:"DESK ESSENTIAL",desc:"More space for your mouse and keyboard on one surface.",art:"mat",detail:"Confirm dimensions, surface material, thickness, stitched edges, real product photos and packaging."},
{id:"keyboard1",name:"Compact mechanical keyboard",category:"Keyboard",tag:"KEYBOARD",desc:"A compact layout idea for a tidy gaming desk.",art:"keyboard",detail:"Verify layout, key legends/language, switch type, connection, total key count and warranty."},
{id:"mic1",name:"USB gaming microphone",category:"Mic & Mixers",tag:"VOICE / STREAM",desc:"A mic concept for game chat, calls and creating content.",art:"mic",detail:"Check connection type, included stand/cable, OS compatibility and power requirements."},
{id:"headset1",name:"Over-ear gaming headset",category:"Headset",tag:"AUDIO",desc:"Comfort and communication for longer sessions.",art:"headset",detail:"Confirm brand and exact model, connection, mic, compatible devices and warranty provider."},
{id:"controller1",name:"Controller grip accessory",category:"Controllers",tag:"PLAY YOUR WAY",desc:"A grip or thumb-control add-on for selected models.",art:"pad",detail:"Never describe this as universal. Confirm supported models, fit, included parts and material."},
{id:"cables1",name:"Cable tidy kit",category:"Desk setup",tag:"CLEAN DESK",desc:"Clips and holders to keep desk and charging cables in place.",art:"cables",detail:"Check pieces per pack, supported cable diameter, adhesive strength and residue risk."},
{id:"stand1",name:"Headset stand",category:"Desk setup",tag:"DESK SETUP",desc:"A place to keep a headset between sessions.",art:"stand",detail:"Check size, stability, material, packaging, shipping damage policy and return address."},
{id:"hub1",name:"Multi-port USB hub",category:"Desk setup",tag:"MORE PORTS",desc:"Bring common USB connections closer to your setup.",art:"hub",detail:"Verify USB standard, ports, power input, compatibility, safety documents and warranty."},
{id:"light1",name:"Monitor light bar",category:"Desk setup",tag:"LIGHTING",desc:"A clean lighting idea for the desk or monitor.",art:"light",detail:"Check dimensions, controls, power input, plug, heat and relevant safety documentation."},
{id:"open1",name:"Inspected open-box gear",category:"Open box",tag:"RE:PLAY",desc:"A future category for condition-graded open-box products.",art:"open",detail:"Only launch after inspection, condition grading, accurate photos, full disclosure, warranty status and return terms are set."}
];
const whatsappNumber="201142497622";
let activeFilter="All gear",searchTerm="",sortMode="featured",cart={},wishlist=new Set();
const $=s=>document.querySelector(s);
const order=new Map(products.map((p,i)=>[p.id,i]));
function artFor(p){
const a={
mouse:'<div class="art-mouse-large"></div>',
mat:'<div class="art-mat-large"><b>PZ.</b><small>STAY IN YOUR ZONE</small></div>',
keyboard:'<div class="art-board">'+Array.from({length:16},()=>'<i></i>').join("")+'</div>',
mic:'<div class="art-mic-large"></div>',
headset:'<div class="art-headset-large"></div>',
pad:'<div class="art-pad-large"></div>',
cables:'<div class="art-cables-large"><i></i><i></i><i></i></div>',
stand:'<div class="art-stand-large"></div>',
hub:'<div class="art-hub-large"></div>',
light:'<div class="art-light-large"></div>',
open:'<div class="art-open-large">PZ<small>RE:PLAY</small></div>'
};
return '<div class="product-image"><span class="product-code">PZ / '+String(order.get(p.id)+1).padStart(2,"0")+'</span><button class="wishlist-toggle '+(wishlist.has(p.id)?"active":"")+'" data-wishlist="'+p.id+'" type="button" aria-label="Toggle wishlist for '+p.name+'" aria-pressed="'+wishlist.has(p.id)+'">'+(wishlist.has(p.id)?"♥":"♡")+'</button>'+(a[p.art]||"")+'<span class="concept-label">CONCEPT VISUAL</span></div>';
}
function filteredProducts(){
let items=products.filter(p=>(activeFilter==="All gear"||p.category===activeFilter)&&(p.name+" "+p.category+" "+p.desc).toLowerCase().includes(searchTerm));
if(sortMode==="name")items.sort((a,b)=>a.name.localeCompare(b.name));
if(sortMode==="category")items.sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
return items;
}
function renderProducts(){
const items=filteredProducts();
$("#product-grid").innerHTML=items.map(p=>'<article class="product-card">'+artFor(p)+'<div class="product-label"><span>'+p.tag+'</span><span class="status-pill">SUPPLIER CHECK PENDING</span></div><h3>'+p.name+'</h3><p>'+p.desc+'</p><div class="product-bottom"><span class="price-pending">PRICE NOT SET</span><button data-details="'+p.id+'" type="button">QUICK VIEW ↗</button><button data-add="'+p.id+'" type="button">ADD TO BAG ＋</button></div></article>').join("");
$("#empty-results").hidden=items.length>0;
}
function setFilter(filter){
activeFilter=filter;
document.querySelectorAll("[data-filter]").forEach(b=>{const on=b.dataset.filter===filter;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));});
renderProducts();
}
function renderCounts(){
$("#cart-count").textContent=Object.values(cart).reduce((a,b)=>a+b,0);
$("#wishlist-count").textContent=wishlist.size;
$("#wishlist-title-count").textContent="("+wishlist.size+")";
$("#cart-title-count").textContent="("+Object.values(cart).reduce((a,b)=>a+b,0)+")";
}
function cartRow(p,forWishlist){
return '<div class="cart-row"><div class="cart-thumb">PZ.</div><div><h3>'+p.name+'</h3><p>Price pending · not available to order</p>'+(forWishlist?'<div class="cart-controls"><button class="remove-item" data-wish-remove="'+p.id+'">REMOVE</button><button data-add="'+p.id+'">ADD TO BAG ＋</button></div>':'<div class="cart-controls"><div class="qty-control"><button data-minus="'+p.id+'" aria-label="Remove one '+p.name+'">−</button><b>'+cart[p.id]+'</b><button data-plus="'+p.id+'" aria-label="Add one '+p.name+'">+</button></div><button class="remove-item" data-remove="'+p.id+'">REMOVE</button></div>')+'</div></div>';
}
function renderCart(){
const items=products.filter(p=>cart[p.id]);
$("#cart-items").innerHTML=items.map(p=>cartRow(p,false)).join("");
$("#cart-empty").hidden=items.length>0;$("#cart-items").hidden=items.length===0;$("#checkout-open").disabled=items.length===0;
renderCounts();
}
function renderWishlist(){
const items=products.filter(p=>wishlist.has(p.id));
$("#wishlist-items").innerHTML=items.map(p=>cartRow(p,true)).join("");
$("#wishlist-empty").hidden=items.length>0;$("#wishlist-items").hidden=items.length===0;
renderCounts();
}
function openLayer(layer){layer.hidden=false;document.body.classList.add("no-scroll")}
function closeLayer(layer){layer.hidden=true;if(Array.from(document.querySelectorAll(".overlay,.modal-layer")).every(x=>x.hidden))document.body.classList.remove("no-scroll")}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();openLayer($("#cart-overlay"))}
function toggleWishlist(id){wishlist.has(id)?wishlist.delete(id):wishlist.add(id);renderProducts();renderWishlist()}
function details(id){
const p=products.find(x=>x.id===id);if(!p)return;
$("#product-modal-content").innerHTML='<p class="eyebrow">'+p.tag+' / SOURCING CONCEPT</p><h2 id="product-modal-title">'+p.name+'</h2><p>'+p.desc+'</p><div class="modal-status"><i></i> STOCK NOT VERIFIED · PRICE NOT SET</div><p>'+p.detail+'</p><p>This is a candidate, not confirmed inventory. Supplier, accurate item photos, real price, shipping, warranty and returns must be checked before sale.</p><button class="button dark full" data-modal-add="'+p.id+'">ADD TO SHORTLIST ＋</button>';
openLayer($("#product-modal"));
}
function setSearch(value){searchTerm=value.trim().toLowerCase();$("#header-search").value=value;$("#product-search").value=value;renderProducts()}
$("#filter-row").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b)setFilter(b.dataset.filter)});
$("#category-grid").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(b){setFilter(b.dataset.category);$("#shop").scrollIntoView({behavior:"smooth"})}});
document.querySelectorAll("[data-nav-category]").forEach(a=>a.addEventListener("click",()=>{setFilter(a.dataset.navCategory);$("#mobile-nav").hidden=true;$("#menu-toggle").setAttribute("aria-expanded","false");$("#menu-toggle").textContent="☰"}));
$("#header-search").addEventListener("input",e=>setSearch(e.target.value));
$("#product-search").addEventListener("input",e=>setSearch(e.target.value));
$("#sort-by").addEventListener("change",e=>{sortMode=e.target.value;renderProducts()});
$("#reset-filters").addEventListener("click",()=>{setFilter("All gear");setSearch("");sortMode="featured";$("#sort-by").value="featured"});
$("#product-grid").addEventListener("click",e=>{const w=e.target.closest("[data-wishlist]"),d=e.target.closest("[data-details]"),a=e.target.closest("[data-add]");if(w){toggleWishlist(w.dataset.wishlist);return}if(d){details(d.dataset.details);return}if(a)addToCart(a.dataset.add)});
$("#open-cart").addEventListener("click",()=>openLayer($("#cart-overlay")));
$("#close-cart").addEventListener("click",()=>closeLayer($("#cart-overlay")));
$("#keep-shopping").addEventListener("click",()=>closeLayer($("#cart-overlay")));
$("#cart-items").addEventListener("click",e=>{const plus=e.target.closest("[data-plus]"),minus=e.target.closest("[data-minus]"),remove=e.target.closest("[data-remove]"),add=e.target.closest("[data-add]");if(plus)cart[plus.dataset.plus]=(cart[plus.dataset.plus]||0)+1;if(minus){const id=minus.dataset.minus;if(cart[id]>1)cart[id]--;else delete cart[id]}if(remove)delete cart[remove.dataset.remove];if(add)cart[add.dataset.add]=(cart[add.dataset.add]||0)+1;renderCart()});
$("#open-wishlist").addEventListener("click",()=>{renderWishlist();openLayer($("#wishlist-overlay"))});
$("#close-wishlist").addEventListener("click",()=>closeLayer($("#wishlist-overlay")));
$("#wishlist-browse").addEventListener("click",()=>{closeLayer($("#wishlist-overlay"));$("#categories").scrollIntoView({behavior:"smooth"})});
$("#wishlist-items").addEventListener("click",e=>{const remove=e.target.closest("[data-wish-remove]"),add=e.target.closest("[data-add]");if(remove)wishlist.delete(remove.dataset.wishRemove);if(add)cart[add.dataset.add]=(cart[add.dataset.add]||0)+1;renderWishlist();renderProducts();renderCart();if(add){closeLayer($("#wishlist-overlay"));openLayer($("#cart-overlay"))}});
$("#checkout-open").addEventListener("click",()=>openLayer($("#checkout-modal")));
$("#whatsapp-order-form").addEventListener("submit",e=>{
e.preventDefault();
const form=new FormData(e.currentTarget),name=String(form.get("name")||"").trim(),area=String(form.get("area")||"").trim();
const lines=products.filter(p=>cart[p.id]).map(p=>"• "+p.name+" × "+cart[p.id]).join("\n");
if(!lines){closeLayer($("#checkout-modal"));return}
const message=["Hi Pixelz! I'd like to ask about these products:","",lines,"","Please confirm the exact model, current availability, final price and delivery cost before I decide.","","Name: "+name,"City / area: "+area,"This is an enquiry only, not a confirmed order."].join("\n");
window.open("https://wa.me/"+whatsappNumber+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
closeLayer($("#checkout-modal"));
});
document.body.addEventListener("click",e=>{const c=e.target.closest("[data-close]");if(c)closeLayer(c.closest(".modal-layer"));const a=e.target.closest("[data-modal-add]");if(a){const id=a.dataset.modalAdd;closeLayer($("#product-modal"));addToCart(id)}});
document.querySelectorAll(".overlay,.modal-layer").forEach(layer=>layer.addEventListener("click",e=>{if(e.target===layer)closeLayer(layer)}));
$("#menu-toggle").addEventListener("click",()=>{const open=$("#mobile-nav").hidden;$("#mobile-nav").hidden=!open;$("#menu-toggle").setAttribute("aria-expanded",String(open));$("#menu-toggle").textContent=open?"×":"☰"});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){document.querySelectorAll(".overlay,.modal-layer").forEach(layer=>{if(!layer.hidden)closeLayer(layer)})}});
renderProducts();renderCart();renderWishlist();
