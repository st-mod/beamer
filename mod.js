var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{a:()=>j,mH:()=>v,u7:()=>d,tR:()=>p,Wi:()=>S,X0:()=>k,oL:()=>a,Kl:()=>x,XG:()=>h,_i:()=>m,_R:()=>g,tC:()=>u,Iz:()=>f});const n=["css","html","js","json","md","stdn","ston","ts","txt","urls"],o=["apng","avif","gif","jpg","jpeg","jfif","pjpeg","pjp","png","svg","webp"],i=[];let r=0;const s=[];let c=0;function l(e){s[c]=r=e,s[++c]=void 0,i[r].scrollIntoView()}function a(){addEventListener("keydown",(e=>{if(0!==i.length)if("Enter"!==e.key){if("Escape"!==e.key)return"ArrowUp"===e.key||"PageUp"===e.key?(e.preventDefault(),void l((r-1+i.length)%i.length)):"ArrowDown"===e.key||"PageDown"===e.key?(e.preventDefault(),void l((r+1)%i.length)):"ArrowLeft"===e.key?(e.preventDefault(),void function(){let e=s[c-1];void 0!==e&&(r=e,c--,i[r].scrollIntoView())}()):"ArrowRight"===e.key?(e.preventDefault(),void function(){let e=s[c+1];void 0!==e&&(r=e,c++,i[r].scrollIntoView())}()):void 0;document.documentElement.classList.remove("showing")}else for(let e=0;e<i.length;e++){const{top:t,height:n}=i[e].getBoundingClientRect();if(t+n/2>=0){l(e),document.documentElement.classList.add("showing");break}}}))}function d(e,t){for(const n of t)for(const t of n){if("string"==typeof t)continue;if(t.tag===e)return t;for(const n of Object.keys(t.options)){const o=t.options[n];if("object"==typeof o){const t=d(e,o);if(void 0!==t)return t}}const n=d(e,t.children);if(void 0!==n)return n}}function p(e,t){const n=[];for(const o of t)for(const t of o)if("string"!=typeof t){t.tag===e&&n.push(t);for(const o of Object.keys(t.options)){const i=t.options[o];"object"==typeof i&&n.push(...p(e,i))}n.push(...p(e,t.children))}return n}function f(e){return u(e.children)}function u(e){if(0===e.length)return"";let t="";for(const n of e[0])t+="string"!=typeof n?f(n):n;return t}function h(e){const t=[];for(const n of e.trim().split(/\s+/))if(/^\d+-$/.test(n))t[Number(n.slice(0,-1))-1]=!0;else if(/^\d+$/.test(n)){const e=Number(n);t[e-1]=!0,t[e]=void 0}else if(/^\d+-\d+$/.test(n)){const[e,o]=n.split("-",2).map(Number);for(let n=e-1;n<o;n++)t[n]=!0;t[o]=void 0}else if(/^-\d+$/.test(n)){const e=Number(n.slice(1));for(let n=0;n<e;n++)t[n]=!0;t[e]=void 0}return t}function m(e){if(0===e.length)return[];const t=e.map(h),n=Math.max(...t.map((e=>e.length)));if(0===n)return[];for(const e of t)if(e.length<n){const t=e[e.length-1];for(let o=e.length;o<n;o++)e[o]=t}return t}function g(e){const t=[],n=[];for(const[,o,i]of e.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g))t.push(o),n.push(i);const o=m(n);if(0===o.length)return[];const i=o[0].length,r=[];for(let e=0;e<i;e++)r[e]=[];for(let e=0;e<o.length;e++){const n=o[e],i=t[e],s=[],c=[];for(const e of i.trim().split(/\s+/)){if(0===e.length){c.push("invisible");break}e.startsWith("^")?c.push(e.slice(1)):s.push(e)}for(let e=0;e<n.length;e++)n[e]?r[e].push(...s):r[e].push(...c)}return r.map((e=>e.join(" ")))}function v(e){const t=[];for(const n of e.querySelectorAll("[data-slide]")){const e=n.getAttribute("data-slide");if(null===e)continue;const o=g(e);o.length>0&&t.push({element:n,classArray:o})}return t}let b="",w="",y="",E=0;const S=async(e,t)=>{const n=d("title",e.children);void 0!==n&&(b="string"==typeof n.options.abbr?n.options.abbr:f(n));const o=p("author",e.children);o.length>0&&(w=o.map((e=>"string"==typeof e.options.abbr?e.options.abbr:f(e))).join(", "));const r=d("date",e.children);void 0!==r&&(y="string"==typeof r.options.abbr?r.options.abbr:f(r)),E++;const s=document.createElement("div");for(let n=0;;n++){const o=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),c=document.createElement("div"),l=document.createElement("main"),a=document.createElement("footer"),d=document.createElement("div"),p=document.createElement("div"),f=document.createElement("div"),u=document.createElement("div");s.append(o),o.append(r),r.append(c),c.append(l),c.append(a),l.append(await t.compileSTDN(e.children)),a.append(d),a.append(p),a.append(f),a.append(u),i.push(o),o.setAttribute("viewBox","0 0 1920 1080"),r.setAttribute("width","100%"),r.setAttribute("height","100%"),d.textContent=w,p.textContent=b,f.textContent=y,u.textContent=E.toString();let h=!1;for(const{element:e,classArray:t}of v(l)){n<t.length-1&&(h=!0);const o=t[Math.min(n,t.length-1)];o.length>0&&e.setAttribute("class",(e.getAttribute("class")??"")+" "+o)}if(!h)break}return s};function k(e){const t=document.querySelector(`[id=${JSON.stringify(e)}]`);if(null===t)return;const n=t.closest(".unit.frame>svg");if(null!==n)for(let e=0;e<i.length;e++)if(i[e]===n){l(e);break}}const j=async(e,t)=>{const{href:i}=e.options;if("string"!=typeof i||!i.startsWith("#"))return await(async(e,t)=>{const i=document.createElement("a");let{src:r,href:s}=e.options;if(!0===r?r="":"number"==typeof r&&(r=r.toString()),!0===s?s="":"number"==typeof s&&(s=s.toString()),"string"==typeof s){if(!s.startsWith("#")){i.target="_blank";const e=new URL(s,t.context.dir);if(e.origin.endsWith(".vscode-resource.vscode-webview.net")){const t=e.pathname.replace(/^.*\./,"");n.includes(t)?window.openCode&&(i.href="",i.addEventListener("click",(n=>{n.preventDefault(),openCode(e.href,t)}))):o.includes(t)&&window.openImg&&(i.href="",i.addEventListener("click",(t=>{t.preventDefault(),openImg(e.href)})))}}}else if("string"==typeof r){i.target="_blank";const e=new URL(r,t.context.dir);i.href="?src="+encodeURIComponent(e.href)+e.hash,window.openSrc&&i.addEventListener("click",(t=>{t.preventDefault(),openSrc(e.href,decodeURIComponent(e.hash).slice(1))}))}return i.append(await t.compileInlineSTDN(e.children)),i})(e,t);const r=document.createElement("a"),s=decodeURIComponent(i.slice(1));return s.length>0&&(r.href="",r.classList.add("no-color"),r.addEventListener("click",(e=>{e.preventDefault(),k(s)}))),r.append(await t.compileInlineSTDN(e.children)),r},x=async(e,t)=>{const n=!0===e.options.pause,o=document.createElement("ul");let i=document.createElement("ul");o.append(i);let r=0;for(const e of t.context.indexInfoArray){if("heading"!==e.realOrbit||e.index.length>2)continue;const s=document.createElement("li");s.append(await t.compileSTDN(e.unit.children)),s.addEventListener("click",(()=>{k(e.id)})),2!==e.index.length?(i=document.createElement("ul"),o.append(s),o.append(i),r++,n&&r>1&&(i.dataset.slide=s.dataset.slide=`${r}-`)):i.append(s)}return o};var A=t.a,I=t.mH,D=t.u7,L=t.tR,C=t.Wi,N=t.X0,R=t.oL,U=t.Kl,O=t.XG,_=t._i,T=t._R,$=t.tC,P=t.Iz;export{A as a,I as extractSlidableElements,D as findUnit,L as findUnits,C as frame,N as jumpTo,R as listen,U as outline,O as parseSlideIndexesStr,_ as parseSlideIndexesStrs,T as parseSlideStr,$ as stdnToInlinePlainString,P as unitToInlinePlainString};