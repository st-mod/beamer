var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{go:()=>s,up:()=>c,zN:()=>l,t$:()=>a,F2:()=>d,Fv:()=>f,$Z:()=>p,JF:()=>h,oL:()=>m,u7:()=>g,tR:()=>v,Iz:()=>b,tC:()=>y,XG:()=>w,_i:()=>E,_R:()=>A,mH:()=>S,yr:()=>x,Wi:()=>D,DT:()=>C,Kl:()=>j});const n=[];let o=0;const r=[];let i=-1;function s(t){o===t&&-1!==i||(r[++i]=o=t,r[i+1]=void 0),n[o].scrollIntoView()}function c(){s((o-1+n.length)%n.length)}function l(){s((o+1)%n.length)}function a(){let t=r[i-1];void 0!==t&&(o=t,i--,n[o].scrollIntoView())}function d(){let t=r[i+1];void 0!==t&&(o=t,i++,n[o].scrollIntoView())}function f(){for(let t=0;t<n.length;t++){const{bottom:e}=n[t].getBoundingClientRect();if(e>1){s(t);break}}}let u=!1;function p(){for(let t=0;t<n.length;t++){const{top:e,height:o}=n[t].getBoundingClientRect();if(e+o/2>=0){document.documentElement.classList.add("showing"),s(t),u=!0;break}}}function h(){u=!1,document.documentElement.classList.remove("showing"),s(o)}function m(){addEventListener("keydown",(t=>{if(0!==n.length)if("Enter"!==t.key){if(u){if("Escape"!==t.key)return"ArrowUp"===t.key||"PageUp"===t.key?(t.preventDefault(),void c()):"ArrowDown"===t.key||"PageDown"===t.key?(t.preventDefault(),void l()):"ArrowLeft"===t.key?(t.preventDefault(),void a()):"ArrowRight"===t.key?(t.preventDefault(),void d()):void 0;h()}}else p()})),addEventListener("scroll",(()=>{u&&f()}))}function g(t,e){for(const n of e)for(const e of n){if("string"==typeof e)continue;if(e.tag===t)return e;for(const n of Object.keys(e.options)){const o=e.options[n];if("object"==typeof o){const e=g(t,o);if(void 0!==e)return e}}const n=g(t,e.children);if(void 0!==n)return n}}function v(t,e){const n=[];for(const o of e)for(const e of o)if("string"!=typeof e){e.tag===t&&n.push(e);for(const o of Object.keys(e.options)){const r=e.options[o];"object"==typeof r&&n.push(...v(t,r))}n.push(...v(t,e.children))}return n}function b(t){return y(t.children)}function y(t){if(0===t.length)return"";let e="";for(const n of t[0])e+="string"!=typeof n?b(n):n;return e}function w(t){const e=[];for(const n of t.trim().split(/\s+/))if(/^\d+-$/.test(n))e[Number(n.slice(0,-1))-1]=!0;else if(/^\d+$/.test(n)){const t=Number(n);e[t-1]=!0,e[t]=void 0}else if(/^\d+-\d+$/.test(n)){const[t,o]=n.split("-",2).map(Number);for(let n=t-1;n<o;n++)e[n]=!0;e[o]=void 0}else if(/^-\d+$/.test(n)){const t=Number(n.slice(1));for(let n=0;n<t;n++)e[n]=!0;e[t]=void 0}return e}function E(t){if(0===t.length)return[];const e=t.map(w),n=Math.max(...e.map((t=>t.length)));if(0===n)return[];for(const t of e)if(t.length<n){const e=t[t.length-1];for(let o=t.length;o<n;o++)t[o]=e}return e}function A(t){const e=[],n=[];for(const[,o,r]of t.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g))e.push(o),n.push(r);const o=E(n);if(0===o.length)return[];const r=o[0].length,i=[];for(let t=0;t<r;t++)i[t]=[];for(let t=0;t<o.length;t++){const n=o[t],r=e[t],s=[],c=[];for(const t of r.trim().split(/\s+/)){if(0===t.length){c.push("invisible");break}t.startsWith("^")?c.push(t.slice(1)):s.push(t)}for(let t=0;t<n.length;t++)n[t]?i[t].push(...s):i[t].push(...c)}return i}function S(t){const e=[];for(const n of t.querySelectorAll("[data-slide]")){const t=n.getAttribute("data-slide");if(null===t)continue;const o=A(t);o.length>0&&e.push({element:n,classesArray:o})}return e}function x(t,e){for(;;){for(;null!==t.nextSibling;)t.nextSibling.remove();if(null===t.parentNode||t.parentNode===e)break;t=t.parentNode}}let k="",N="",I="",$=0;const D=async(t,e)=>{const o=g("title",t.children);void 0!==o&&(k="string"==typeof o.options.abbr?o.options.abbr:b(o));const r=v("author",t.children);r.length>0&&(N=r.map((t=>"string"==typeof t.options.abbr?t.options.abbr:b(t))).join(", "));const i=g("date",t.children);void 0!==i&&(I="string"==typeof i.options.abbr?i.options.abbr:b(i)),$++;const s=document.createElement("div");for(let o=0;;o++){const r=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),c=document.createElement("div"),l=document.createElement("main"),a=document.createElement("footer"),d=document.createElement("div"),f=document.createElement("div"),u=document.createElement("div"),p=document.createElement("div");s.append(r),r.append(i),i.append(c),c.append(l),c.append(a),l.append(await e.compileSTDN(t.children)),a.append(d),a.append(f),a.append(u),a.append(p),n.push(r),r.setAttribute("viewBox","0 0 1920 1080"),i.setAttribute("width","100%"),i.setAttribute("height","100%"),d.textContent=N,f.textContent=k,u.textContent=I,p.textContent=$.toString();let h=!1;const m=l.querySelectorAll(".unit.pause")[o];void 0!==m&&(x(m,l),h=!0);for(const{element:t,classesArray:e}of S(l))o<e.length-1&&(h=!0),t.classList.add(...e[Math.min(o,e.length-1)]);if(!h)break}return s},L=["download","href","hreflang","ping","referrerpolicy","rel","target","type"];function C(t){for(const e of t.querySelectorAll("a")){const t=document.createElement("span");for(const{name:n,value:o}of e.attributes)if(!L.includes(n))try{t.setAttribute(n,o)}catch(t){console.log(t)}for(const n of e.childNodes)t.append(n);e.replaceWith(t)}return t}const j=async(t,e)=>{const n=!0===t.options.pause,o=document.createElement("ul");let r,i=0,s=0;for(const t of e.context.indexInfoArray){if("heading"!==t.orbit||t.index.length>2)continue;const c=document.createElement("li"),l=document.createElement("a");c.append(l),l.append(C(await e.compileSTDN(t.unit.children))),l.href=`#${encodeURIComponent(t.id)}`,2!==t.index.length?(r=document.createElement("ul"),o.append(c),c.append(r),i++,s++,n&&i>1&&(c.dataset.slide=`${i}-`)):void 0!==r&&(r.append(c),s++)}return s>12&&o.classList.add("compact"),s>24&&o.classList.add("very-compact"),o};var R=e.zN,z=e.JF,F=e.mH,O=e.u7,P=e.tR,T=e.Wi,_=e.go,U=e.t$,W=e.oL,Z=e.Fv,q=e.Kl,B=e.XG,V=e._i,G=e._R,H=e.yr,J=e.DT,K=e.F2,M=e.$Z,X=e.tC,Q=e.Iz,Y=e.up;export{R as down,z as exit,F as extractSlidableElements,O as findUnit,P as findUnits,T as frame,_ as go,U as left,W as listen,Z as normalize,q as outline,B as parseSlideIndexesStr,V as parseSlideIndexesStrs,G as parseSlideStr,H as removeAfter,J as replaceAnchors,K as right,M as show,X as stdnToInlinePlainString,Q as unitToInlinePlainString,Y as up};