var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{oL:()=>l,_R:()=>h,mH:()=>m,Wi:()=>E,Kl:()=>x});const n=[];let o=0;const r=[];let i=-1;function s(t){o===t&&-1!==i||(r[++i]=o=t,r[i+1]=void 0),n[o].scrollIntoView()}let c=!1;function l(){addEventListener("keydown",(t=>{if(0!==n.length)if("Enter"!==t.key){if(c)return"Escape"===t.key?(c=!1,document.documentElement.classList.remove("showing"),void s(o)):"ArrowUp"===t.key||"PageUp"===t.key?(t.preventDefault(),void s((o-1+n.length)%n.length)):"ArrowDown"===t.key||"PageDown"===t.key?(t.preventDefault(),void s((o+1)%n.length)):"ArrowLeft"===t.key?(t.preventDefault(),void function(){let t=r[i-1];void 0!==t&&(o=t,i--,n[o].scrollIntoView())}()):"ArrowRight"===t.key?(t.preventDefault(),void function(){let t=r[i+1];void 0!==t&&(o=t,i++,n[o].scrollIntoView())}()):void 0}else!function(){for(let t=0;t<n.length;t++){const{top:e,height:o}=n[t].getBoundingClientRect();if(e+o/2>=0){document.documentElement.classList.add("showing"),s(t),c=!0;break}}}()})),addEventListener("scroll",(()=>{c&&function(){for(let t=0;t<n.length;t++){const{bottom:e}=n[t].getBoundingClientRect();if(e>1){s(t);break}}}()}))}function a(t,e){for(const n of e)for(const e of n){if("string"==typeof e)continue;if(e.tag===t)return e;for(const n of Object.keys(e.options)){const o=e.options[n];if("object"==typeof o){const e=a(t,o);if(void 0!==e)return e}}const n=a(t,e.children);if(void 0!==n)return n}}function d(t,e){const n=[];for(const o of e)for(const e of o)if("string"!=typeof e){e.tag===t&&n.push(e);for(const o of Object.keys(e.options)){const r=e.options[o];"object"==typeof r&&n.push(...d(t,r))}n.push(...d(t,e.children))}return n}function f(t){let e="";for(const n of t)e+="string"!=typeof n?u(n):n;return e}function u(t){return function(t){for(const e of t){const t=f(e);if(t.length>0)return t}return""}(t.children)}function p(t){const e=[];for(const n of t.trim().split(/\s+/))if(/^\d+-$/.test(n))e[Number(n.slice(0,-1))-1]=!0;else if(/^\d+$/.test(n)){const t=Number(n);e[t-1]=!0,e[t]=void 0}else if(/^\d+-\d+$/.test(n)){const[t,o]=n.split("-",2).map(Number);for(let n=t-1;n<o;n++)e[n]=!0;e[o]=void 0}else if(/^-\d+$/.test(n)){const t=Number(n.slice(1));for(let n=0;n<t;n++)e[n]=!0;e[t]=void 0}return e}function h(t){const e=[],n=[];for(const[,o,r]of t.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g))e.push(o),n.push(r);const o=function(t){if(0===t.length)return[];const e=t.map(p),n=Math.max(...e.map((t=>t.length)));if(0===n)return[];for(const t of e)if(t.length<n){const e=t[t.length-1];for(let o=t.length;o<n;o++)t[o]=e}return e}(n);if(0===o.length)return[];const r=o[0].length,i=[];for(let t=0;t<r;t++)i[t]=[];for(let t=0;t<o.length;t++){const n=o[t],r=e[t],s=[],c=[];for(const t of r.trim().split(/\s+/)){if(0===t.length){c.push("invisible");break}t.startsWith("^")?c.push(t.slice(1)):s.push(t)}for(let t=0;t<n.length;t++)n[t]?i[t].push(...s):i[t].push(...c)}return i}function m(t){const e=[];for(const n of t.querySelectorAll("[data-slide]")){const t=n.getAttribute("data-slide");if(null===t)continue;const o=h(t);o.length>0&&e.push({element:n,classesArray:o})}return e}function g(t,e){for(;;){for(;null!==t.nextSibling;)t.nextSibling.remove();if(null===t.parentNode||t.parentNode===e)break;t=t.parentNode}}let v="",b="",y="",w=0;const E=async(t,e)=>{const o=a("title",t.children);void 0!==o&&(v="string"==typeof o.options.abbr?o.options.abbr:u(o));const r=d("author",t.children);r.length>0&&(b=r.map((t=>"string"==typeof t.options.abbr?t.options.abbr:u(t))).join(", "));const i=a("date",t.children);void 0!==i&&(y="string"==typeof i.options.abbr?i.options.abbr:u(i)),w++;const s=document.createElement("div");for(let o=0;;o++){const r=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),c=document.createElement("div"),l=document.createElement("main"),a=document.createElement("footer"),d=document.createElement("div"),f=document.createElement("div"),u=document.createElement("div"),p=document.createElement("div");s.append(r),r.append(i),i.append(c),c.append(l),c.append(a),l.append(await e.compileSTDN(t.children)),a.append(d),a.append(f),a.append(u),a.append(p),n.push(r),r.setAttribute("viewBox","0 0 1920 1080"),i.setAttribute("width","100%"),i.setAttribute("height","100%"),d.textContent=b,f.textContent=v,u.textContent=y,p.textContent=w.toString();let h=!1;const E=l.querySelectorAll(".unit.pause")[o];void 0!==E&&(g(E,l),h=!0);for(const{element:t,classesArray:e}of m(l))o<e.length-1&&(h=!0),t.classList.add(...e[Math.min(o,e.length-1)]);if(!h)break}return s},A=["download","href","hreflang","ping","referrerpolicy","rel","target","type"];function k(t){for(const e of t.querySelectorAll("a")){const t=document.createElement("span");for(const{name:n,value:o}of e.attributes)if(!A.includes(n))try{t.setAttribute(n,o)}catch(t){console.log(t)}for(const n of e.childNodes)t.append(n);e.replaceWith(t)}return t}const x=async(t,e)=>{const n=!0===t.options.pause,o=document.createElement("ul");let r,i=0,s=0;for(const t of e.context.indexInfoArray){if("heading"!==t.orbit||t.index.length>2)continue;const c=document.createElement("li"),l=document.createElement("a");c.append(l),l.append(k(await e.compileSTDN(t.unit.children))),l.href=`#${encodeURIComponent(t.id)}`,2!==t.index.length?(r=document.createElement("ul"),o.append(c),c.append(r),i++,s++,n&&i>1&&(c.dataset.slide=`${i}-`)):void 0!==r&&(r.append(c),s++)}return s>12&&o.classList.add("compact"),s>24&&o.classList.add("very-compact"),o};var S=e.mH,N=e.Wi,L=e.oL,j=e.Kl,D=e._R;export{S as extractSlidableElements,N as frame,L as listen,j as outline,D as parseSlideStr};