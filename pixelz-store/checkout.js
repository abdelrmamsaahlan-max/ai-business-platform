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
const buy=params.get("buy"),saved=read(),cart=buy?(products.some(p=>p.id===buy)?{[buy]:1}:{}):saved,items=products.filter(p=>Number(cart[p.id])>0),form=$("#checkout-form");
function photo(p){return p.image?'<img src="'+p.image+'" alt="" loading="lazy" referrerpolicy="no-referrer">':'<div class="summary-placeholder">PZ.</div>'}
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
$("#checkout-items").addEventListener("error",e=>{if(e.target.tagName==="IMG"){const placeholder=document.createElement("div");placeholder.className="summary-placeholder";placeholder.textContent="PZ.";e.target.replaceWith(placeholder)}},true);