const products=[
{id:"kc6000",image:"https://kimostore.net/cdn/shop/files/ST-StandardKC6000WiredKeyboard_MouseComboEnglish_Arabic_3_e92ff11c-2a94-4f00-bb3e-f060474a09fc.jpg?v=1776242818&width=1000",name:"طقم ST KC6000 السلكي",en:"ST KC6000 Wired Keyboard & Mouse",category:"Keyboard",type:"keyboard",badge:"كيبورد + ماوس",desc:"طقم سلكي USB بسيط لبداية setup مرتبة.",detail:"مجموعة كيبورد وماوس سلكية من ST. اسألنا عن السعر الحالي والتوفر قبل تأكيد الطلب.",source:"https://shopzawy.com/ar/products/keyboard-and-mouse-combo-st-kc6000-wired/"},
{id:"kcw6000",image:"https://api.cezma.cloud/storage/thumbnails/products/web/1745337320kcw-6000-wireless-1020-x-575-1.png",name:"طقم ST KCW6000 اللاسلكي",en:"ST KCW6000 Wireless Combo",category:"Keyboard",type:"keyboard",badge:"لاسلكي 2.4GHz",desc:"كيبورد وماوس لاسلكي مع USB nano receiver.",detail:"اتصال لاسلكي 2.4GHz ومدى معلن يصل إلى 10 متر. اسألنا عن السعر الحالي والتوفر قبل تأكيد الطلب.",source:"https://shopzawy.com/ar/products/keyboard-and-mouse-combo-st-kcw6000-wireless/"},
{id:"tesoro",image:"https://microless.com/cdn/products/510b0d5b18a025398fb414b7349fb272-hi.jpg",name:"Tesoro 8200DPI Gaming Mouse",en:"Tesoro Programmable RGB Mouse",category:"Mouse",type:"mouse",badge:"سلكي / RGB",desc:"ماوس جيمينج سلكي بإضاءة RGB وإمكانية البرمجة.",detail:"الكتالوج العام يصفه بأنه ماوس Tesoro سلكي بإضاءة RGB وقابل للبرمجة وبدقة تصل إلى 8200 DPI. أكّد مواصفات النسخة المتاحة قبل الطلب.",source:"https://shopzawy.com/ar/category/computer-and-accessories/"},
{id:"wolf-pad",name:"Microsoft Wolf Gel Mouse Pad",en:"Wolf 180 × 120 Gel Pad",category:"Mouse pad",type:"pad",badge:"مقاس 180 × 120",desc:"ماوس باد جل صغير يساعدك ترتب مساحة الماوس.",detail:"كتالوج Shopzawy يدرجه باسم Wolf 180 × 120 Gel Mouse Pad. الخامة والنسخة والسعر النهائي تتأكد قبل الطلب.",source:"https://shopzawy.com/ar/products/mouse-pad-jel-color-microsoft-wolf-180-120/"},
{id:"gm09",image:"https://motajer.b-cdn.net/uploads/alexstore/products/1744286170939.jpg",name:"Standard GM-09 Gaming Headphone",en:"Standard GM-09 / Black",category:"Headset",type:"headset",badge:"Gaming audio",desc:"سماعة جيمينج over-ear باللون الأسود.",detail:"موديل Standard GM-09 ظاهر بكتالوج Shopzawy. تفاصيل التوصيل والتوافق والضمان تتأكد قبل الطلب.",source:"https://shopzawy.com/en/category/headset/"},
{id:"gm2100",image:"https://kimostore.net/cdn/shop/files/ST-StandardGM-2100LRStereoRainbowGamingHeadset_1_666e837d-9c9f-4cca-8557-0d6cadd17407.jpg?v=1775911300&width=1000",name:"Standard GM2100LR Surround Headphone",en:"Standard GM2100LR",category:"Headset",type:"headset",badge:"Surround audio",desc:"اختيار تاني للصوت والجيمينج من Standard.",detail:"اسم المنتج في الكتالوج: Standard Surround Headphone ST GM2100LR. راجع التوافق والملحقات معانا قبل الطلب.",source:"https://shopzawy.com/en/products/standard-surround-headphone-st-gm2100lr/"}
];
const waNumber="201142497622";
let cart=load("pixelz-cart",{}),filter="all",query="";
const $=s=>document.querySelector(s);
function load(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}}
function save(){localStorage.setItem("pixelz-cart",JSON.stringify(cart));renderCart()}
function iconArt(type,image,alt){if(image)return '<img class="product-photo" src="'+image+'" alt="'+alt.replace(/"/g,"&quot;")+'" loading="lazy" decoding="async" referrerpolicy="no-referrer">';return type==="keyboard"?'<div class="gear-art art-keyboard">'+Array.from({length:24},(_,i)=>'<i></i>').join("")+'</div>':type==="mouse"?'<div class="gear-art art-mouse"></div>':type==="pad"?'<div class="gear-art art-pad">PIXELZ<span>.</span></div>':'<div class="gear-art art-headset"></div>'}
function render(){
const shown=products.filter(p=>(filter==="all"||p.category===filter)&&(p.name+" "+p.en+" "+p.desc+" "+p.category).toLowerCase().includes(query));
$("#result-count").textContent=shown.length+" "+(shown.length===1?"منتج":"منتجات");
$("#product-grid").innerHTML=shown.length?shown.map((p,i)=>'<article class="product-card"><div class="product-visual '+p.type+'"><span class="visual-index">PZ / '+String(products.indexOf(p)+1).padStart(2,"0")+'</span>'+iconArt(p.type,p.image,p.name)+'<span class="visual-label">PIXELZ / GEAR STUDY</span></div><div class="product-topline"><span class="product-category">'+p.en.split(" ")[0]+' / '+p.category+'</span><span class="product-badge">'+p.badge+'</span></div><h3>'+p.name+'</h3><p class="product-desc">'+p.desc+'</p><div class="product-meta"><span>السعر والتوفر</span><b>يتأكد قبل الطلب</b></div><div class="product-actions"><button class="add-button" data-add="'+p.id+'">ضيف للسلة <span>＋</span></button><button class="details-button" data-details="'+p.id+'" aria-label="تفاصيل '+p.name+'">↗</button></div></article>').join(""):'<div class="empty-state"><b>ملقيناش حاجة بالبحث ده</b><p>جرّب اسم تاني أو اختار تصنيف مختلف.</p></div>';
}
function filterBy(value){filter=value;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b.dataset.filter===value));render()}
function count(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function renderCart(){
$("#cart-count").textContent=count();$("#cart-title-count").textContent="("+count()+")";
const items=products.filter(p=>cart[p.id]);
$("#cart-items").innerHTML=items.map(p=>'<div class="cart-row"><div class="cart-thumb">'+(p.type==="headset"?"PZ / AUDIO":"PZ / GEAR")+'</div><div><h3>'+p.name+'</h3><p>السعر والتوفر بيتأكدوا قبل الطلب</p><div class="cart-controls"><div class="qty-control"><button data-qty="-1" data-id="'+p.id+'" aria-label="قلل الكمية">−</button><b>'+cart[p.id]+'</b><button data-qty="1" data-id="'+p.id+'" aria-label="زود الكمية">+</button></div><button class="remove-item" data-remove="'+p.id+'">شيل</button></div></div></div>').join("");
$("#cart-empty").hidden=items.length>0;$("#cart-items").hidden=!items.length;$("#checkout-open").disabled=!items.length;
}
function open(layer){layer.hidden=false;document.body.classList.add("locked")}
function close(layer){layer.hidden=true;if([...document.querySelectorAll(".overlay,.modal-wrap")].every(x=>x.hidden))document.body.classList.remove("locked")}
let toastTimer;
function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),1800)}
function add(id){cart[id]=(cart[id]||0)+1;save();toast("اتضاف للسلة ✓")}
function detail(id){const p=products.find(x=>x.id===id);if(!p)return;const text="Hi Pixelz! I have a question about: "+p.name+" — "+p.source;window.open("https://wa.me/"+waNumber+"?text="+encodeURIComponent(text),"_blank","noopener,noreferrer")}
$("#filter-inline").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b)filterBy(b.dataset.filter)});
document.querySelector(".category-list").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b){filterBy(b.dataset.filter);$("#shop").scrollIntoView({behavior:"smooth"})}});
$("#product-grid").addEventListener("error",e=>{const img=e.target.closest(".product-photo");if(!img)return;const visual=img.closest(".product-visual");if(visual)img.replaceWith(document.createRange().createContextualFragment(iconArt(visual.classList.contains("keyboard")?"keyboard":visual.classList.contains("mouse")?"mouse":visual.classList.contains("pad")?"pad":"headset")))},true);
$("#product-grid").addEventListener("click",e=>{const a=e.target.closest("[data-add]"),d=e.target.closest("[data-details]");if(a)add(a.dataset.add);if(d)detail(d.dataset.details)});
function search(value){query=value.trim().toLowerCase();$("#search-input").value=value;$("#grid-search").value=value;render()}
$("#search-input").addEventListener("input",e=>search(e.target.value));$("#grid-search").addEventListener("input",e=>search(e.target.value));
$("#open-cart").addEventListener("click",()=>open($("#cart-overlay")));$("#close-cart").addEventListener("click",()=>close($("#cart-overlay")));$("#keep-shopping").addEventListener("click",()=>close($("#cart-overlay")));
$("#cart-items").addEventListener("click",e=>{const qty=e.target.closest("[data-qty]"),remove=e.target.closest("[data-remove]");if(qty){const id=qty.dataset.id;cart[id]=(cart[id]||0)+Number(qty.dataset.qty);if(cart[id]<=0)delete cart[id];save()}if(remove){delete cart[remove.dataset.remove];save()}});
$("#checkout-open").addEventListener("click",()=>open($("#order-modal")));
$("#order-form").addEventListener("submit",e=>{e.preventDefault();const name=new FormData(e.currentTarget).get("name"),gov=new FormData(e.currentTarget).get("governorate");const lines=products.filter(p=>cart[p.id]).map(p=>"• "+p.name+" × "+cart[p.id]+" — "+p.source);if(!lines.length)return;const msg=["أهلاً Pixelz، عايز أطلب/أستفسر عن المنتجات دي:","",...lines,"","من فضلك أكدلي السعر النهائي والتوفر وتكلفة التوصيل للمحافظة قبل تأكيد الطلب.","","الاسم: "+name,"المحافظة: "+gov,"هأبعت تفاصيل العنوان بعد تأكيد السعر."].join("\n");window.open("https://wa.me/"+waNumber+"?text="+encodeURIComponent(msg),"_blank","noopener,noreferrer");close($("#order-modal"))});
$("#menu-toggle").addEventListener("click",()=>{const n=$("#mobile-nav"),openNow=n.hidden;n.hidden=!openNow;$("#menu-toggle").setAttribute("aria-expanded",String(openNow));$("#menu-toggle").textContent=openNow?"×":"☰"});
document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{$("#mobile-nav").hidden=true;$("#menu-toggle").setAttribute("aria-expanded","false");$("#menu-toggle").textContent="☰"}));
document.body.addEventListener("click",e=>{const c=e.target.closest("[data-close]");if(c)close(c.closest(".modal-wrap"))});
$("#cart-overlay").addEventListener("click",e=>{if(e.target===$("#cart-overlay"))close($("#cart-overlay"))});
$("#order-modal").addEventListener("click",e=>{if(e.target===$("#order-modal"))close($("#order-modal"))});
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".overlay,.modal-wrap").forEach(x=>{if(!x.hidden)close(x)})});
const revealObserver="IntersectionObserver" in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in-view");revealObserver.unobserve(entry.target)}}),{threshold:.12}):null;
const observeCards=()=>{if(revealObserver)document.querySelectorAll(".product-card:not(.in-view)").forEach(card=>revealObserver.observe(card));else document.querySelectorAll(".product-card").forEach(card=>card.classList.add("in-view"))};
const originalRender=render;render=function(){originalRender();observeCards()};
render();renderCart();
