const products=window.PIXELZ_PRODUCTS||[],$=s=>document.querySelector(s),params=new URLSearchParams(location.search);
function read(){
  try{
    const raw=JSON.parse(localStorage.getItem("pixelz-cart"));
    if(!raw||typeof raw!=="object"||Array.isArray(raw))return {};
    const clean={};
    for(const p of products){
      const n=Math.floor(Number(raw[p.id])||0);
      if(n>0)clean[p.id]=Math.min(n,99);
    }
    return clean;
  }catch{return {}}
}
function money(n){return new Intl.NumberFormat("en-EG").format(n)+" ج.م"}
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
const buy=params.get("buy"),saved=read(),requestedQuantity=Math.min(99,Math.max(1,Math.floor(Number(params.get("quantity"))||1))),cart=buy?(products.some(p=>p.id===buy)?{[buy]:requestedQuantity}:{}):saved,items=products.filter(p=>Number(cart[p.id])>0),form=$("#checkout-form");
function photo(p){return p.image?'<img src="'+p.image+'" alt="" loading="lazy" decoding="async">':productIconSvg(p.type)}
function render(){if(!items.length){$("#checkout-items").innerHTML='<div class="checkout-empty"><b>السلة فاضية</b><p>اختار منتج من المتجر وارجع هنا.</p><a class="cta-primary" href="/#shop">شوف المنتجات ↙</a></div>';form.hidden=true;return}
const q=p=>Number(cart[p.id])||0,total=items.reduce((s,p)=>s+p.price*q(p),0);$("#summary-count").textContent="("+items.reduce((s,p)=>s+q(p),0)+")";$("#checkout-items").innerHTML=items.map(p=>'<div class="checkout-item"><div class="checkout-thumb">'+photo(p)+'</div><div class="checkout-item-copy"><b>'+p.name+'</b><small>الكمية: '+q(p)+'</small></div><strong>'+money(p.price*q(p))+'</strong></div>').join("");$("#checkout-subtotal").textContent=money(total);$("#checkout-total").textContent=money(total)}
function mobile(v){
  const western=String(v)
    .replace(/[٠-٩]/g,ch=>String("٠١٢٣٤٥٦٧٨٩".indexOf(ch)))
    .replace(/[۰-۹]/g,ch=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(ch)));
  let d=western.replace(/\D/g,"");
  if(d.startsWith("0020"))d="0"+d.slice(4);
  else if(d.startsWith("20")&&d.length===12)d="0"+d.slice(2);
  return d;
}
form.addEventListener("submit",e=>{e.preventDefault();if(!items.length)return;const d=new FormData(form),name=String(d.get("name")||"").trim(),phone=mobile(String(d.get("phone")||"")),gov=String(d.get("governorate")||""),city=String(d.get("city")||"").trim(),address=String(d.get("address")||"").trim(),notes=String(d.get("notes")||"").trim();if(!name){alert("اكتب الاسم بالكامل.");return}if(!/^01[0125][0-9]{8}$/.test(phone)){alert("اكتب رقم موبايل مصري صحيح من 11 رقم.");return}
const total=items.reduce((s,p)=>s+p.price*(Number(cart[p.id])||0),0),lines=items.map(p=>"• "+p.name+" × "+cart[p.id]+" — "+money(p.price*Number(cart[p.id]))),message=["طلب جديد من PIXELZ","طريقة الدفع المطلوبة: عند الاستلام","","المنتجات:",...lines,"","إجمالي المنتجات قبل الشحن: "+money(total),"الشحن: برجاء تأكيد التكلفة والمدة حسب العنوان","","الاسم: "+name,"الموبايل: "+phone,"المحافظة: "+gov,"المدينة: "+city,"العنوان: "+address,notes?"ملاحظات: "+notes:"","من فضلك أكد توافر المنتجات والسعر النهائي وإمكانية الدفع عند الاستلام قبل تثبيت الطلب."].filter(Boolean).join("\n"),url="https://wa.me/201142497622?text="+encodeURIComponent(message),tab=window.open(url,"_blank");if(tab)tab.opener=null;else location.href=url});
render();
$("#checkout-items").addEventListener("error",e=>{if(e.target.tagName==="IMG"){const placeholder=document.createElement("div");placeholder.className="summary-placeholder";placeholder.innerHTML=productIconSvg("all");e.target.replaceWith(placeholder)}},true);