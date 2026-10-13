/* توابع خالص محاسباتی: هم در index.html و هم در tests.js استفاده می‌شود */
const FA='۰۱۲۳۴۵۶۷۸۹';
const norm=v=>String(v??'').replace(/[۰-۹]/g,d=>FA.indexOf(d)).replace(/[٠-٩]/g,d=>d.charCodeAt(0)-1632);
const num=v=>{let s=norm(v).replace(/[\s\u200c]/g,'').replace(/[−–]/g,'-').replace(/[،٬]/g,',').replace(/٫/g,'.');if(/^-?\d+\/\d+$/.test(s))s=s.replace('/','.');else if(/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s))s=s.replace(/,/g,'');else s=s.replace(/,/g,'.');const n=parseFloat(s.replace(/[^\d.\-]/g,''));return isFinite(n)?n:0};
const MAT=[['آرد کامل',40,1500000,20.32],['آرد سفید',40,500000,11.5],['شیر گاو',1,27000,16.6],['روغن',17,1700000,3.64],['خمیرمایه خشک',10,1700000,.32],['نمک',10,300000,.8],['شکر',1,55000,.32],['پودر آب پنیر',1,160000,.4],['ادویه نان',1,10000,.02],['پودر زنجبیل',1,180000,.05],['بکینگ پودر',1,120000,.03]];
const buildMat=(arr,v)=>{if(Array.isArray(arr))return arr.filter(x=>x&&typeof x==='object').slice(0,60).map(x=>({n:String(x.n??'').slice(0,40),w:x.w??1,p:x.p??0,u:x.u??0}));v=v||{};return MAT.map((m,i)=>({n:m[0],w:m[1],p:v['p'+i]??m[2],u:v['u'+i]??m[3]}))};
function cost(S){const mat=S.m.reduce((a,x,i)=>a+x.p*x.u/(x.w||1),0)*S.dough,labor=S.labor/30,rent=S.rent/30,fixed=labor+rent+S.util,total=mat+fixed,avg=S.ws*S.mix+S.rt*(1-S.mix),vpp=mat/S.pk;
return{mat,labor,rent,util:S.util,fixed,total,cpp:total/S.pk,ckg:total/(S.pk*S.wg/1000),avg,vpp,day:c=>c*(avg-vpp)-fixed}}
function reg(p){const n=p.length,mx=p.reduce((a,q)=>a+q[0],0)/n,my=p.reduce((a,q)=>a+q[1],0)/n;let sxy=0,sxx=0,syy=0;p.forEach(q=>{sxy+=(q[0]-mx)*(q[1]-my);sxx+=(q[0]-mx)**2;syy+=(q[1]-my)**2});const b=sxx?sxy/sxx:0;return{b,a:my-b*mx,my,r2:sxx&&syy?sxy*sxy/(sxx*syy):0}}
function j2g(jy,jm,jd){jy+=1595;let d=-355668+365*jy+~~(jy/33)*8+~~((jy%33+3)/4)+jd+(jm<7?(jm-1)*31:(jm-7)*30+186),g=400*~~(d/146097);d%=146097;if(d>36524){g+=100*~~(--d/36524);d%=36524;if(d>=365)d++}g+=4*~~(d/1461);d%=1461;if(d>365){g+=~~((d-1)/365);d=(d-1)%365}let gd=d+1;const a=[0,31,(g%4==0&&g%100!=0)||g%400==0?29:28,31,30,31,30,31,31,30,31,30,31];let gm=0;for(;gm<13&&gd>a[gm];gm++)gd-=a[gm];return[g,gm,gd]}
const ksnap=C=>({a:Math.round(C.avg),v:Math.round(C.vpp*100)/100,f:Math.round(C.fixed)}),kprofit=(k,c)=>Math.round(c*(k.a-k.v)-k.f);
if(typeof module!=='undefined')module.exports={norm,num,MAT,buildMat,cost,reg,j2g,ksnap,kprofit};
