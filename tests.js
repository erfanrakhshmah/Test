// اجرا: node tests.js
const a=require('assert'),K=require('./core.js');
const near=(x,y,e=1e-6)=>a.ok(Math.abs(x-y)<=e,x+' != '+y);
a.deepStrictEqual(['0,5','۱٫۵','1,500','۱,۵۰۰,۰۰۰','۲۰/۳۲','−12','abc','37000000','٣٫٥'].map(K.num),[0.5,1.5,1500,1500000,20.32,-12,0,37000000,3.5]);
a.deepStrictEqual(K.j2g(1405,7,21),[2026,10,13]);a.deepStrictEqual(K.j2g(1403,12,30),[2025,3,20]);a.deepStrictEqual(K.j2g(1404,1,1),[2025,3,21]);
const r=K.reg([[0,1],[1,3],[2,5],[3,7]]);near(r.b,2);near(r.a,1);near(r.r2,1);
const S={m:K.MAT.map(m=>({p:m[2],u:m[3],w:m[1]})),labor:37e6,rent:0,util:1e5,pk:45,wg:920,dough:1,ws:18e4,rt:2e5,mix:.5},C=K.cost(S);
const mat=S.m.reduce((s,x)=>s+x.p*x.u/x.w,0);
near(C.mat,mat);near(C.fixed,37e6/30+1e5);near(C.cpp*45,C.total);near(C.avg,19e4);
near(C.day(45),45*C.avg-C.total,1e-3);near(C.ckg*45*.92,C.total,1e-3);
const k=K.ksnap(C);a.ok(Math.abs(K.kprofit(k,45)-C.day(45))<=45*.5+2);
const S2=JSON.parse(JSON.stringify(S));S2.m[0].p*=2;a.ok(K.cost(S2).cpp>C.cpp);
const kfix=K.ksnap(C),later=K.ksnap(K.cost(S2));a.strictEqual(K.kprofit(kfix,45),K.kprofit(kfix,45));a.ok(K.kprofit(later,45)<K.kprofit(kfix,45));
const bm=K.buildMat(undefined,{p0:'1600000',u1:'12'});a.strictEqual(bm.length,11);a.strictEqual(bm[0].p,'1600000');a.strictEqual(bm[1].u,'12');a.strictEqual(bm[0].w,40);
a.strictEqual(K.buildMat([]).length,0);a.deepStrictEqual(K.buildMat([{n:'x',p:5}]),[{n:'x',w:1,p:5,u:0}]);
const S3=JSON.parse(JSON.stringify(S));S3.m[0].w*=2;near(K.cost(S).mat-K.cost(S3).mat,S.m[0].p*S.m[0].u/S.m[0].w/2);
const S4=JSON.parse(JSON.stringify(S));S4.m.push({p:10000,u:2,w:5});near(K.cost(S4).mat-K.cost(S).mat,4000);
console.log('همه‌ی تست‌ها گذشت');
