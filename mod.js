var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{oL:()=>a,_R:()=>m,mH:()=>g,Wi:()=>E,Kl:()=>L});const n=[];let o=0;const i=[];let r=-1;function c(e){o===e&&-1!==r||(i[++r]=o=e,i[r+1]=void 0),n[o].scrollIntoView()}let l,s=!1;function a(){addEventListener("keydown",(e=>{if(0!==n.length)if("Enter"!==e.key){if(s)return"Escape"===e.key?(s=!1,document.documentElement.classList.remove("showing"),void c(o)):"ArrowUp"===e.key||"PageUp"===e.key?(e.preventDefault(),void c((o-1+n.length)%n.length)):"ArrowDown"===e.key||"PageDown"===e.key?(e.preventDefault(),void c((o+1)%n.length)):"ArrowLeft"===e.key?(e.preventDefault(),void function(){let e=i[r-1];void 0!==e&&(o=e,r--,n[o].scrollIntoView())}()):"ArrowRight"===e.key?(e.preventDefault(),void function(){let e=i[r+1];void 0!==e&&(o=e,r++,n[o].scrollIntoView())}()):void 0}else!function(){for(let e=0;e<n.length;e++){const{top:t,height:o}=n[e].getBoundingClientRect();if(t+o/2>=0){document.documentElement.classList.add("showing"),c(e),s=!0;break}}}()})),addEventListener("scroll",(()=>{s&&function(){for(let e=0;e<n.length;e++){const{bottom:t}=n[e].getBoundingClientRect();if(t>1){c(e);break}}}()}))}function d(e,t){for(const n of t)for(const t of n){if("string"==typeof t)continue;if(t.tag===e)return t;for(const n of Object.keys(t.options)){const o=t.options[n];if("object"==typeof o){const t=d(e,o);if(void 0!==t)return t}}const n=d(e,t.children);if(void 0!==n)return n}}function f(e,t){const n=[];for(const o of t)for(const t of o)if("string"!=typeof t){t.tag===e&&n.push(t);for(const o of Object.keys(t.options)){const i=t.options[o];"object"==typeof i&&n.push(...f(e,i))}n.push(...f(e,t.children))}return n}function p(e){let t="";for(const n of e)t+="string"!=typeof n?function(e){for(const t of e){const e=p(t);if(e.length>0)return e}return""}(n.children):n;return t}function u(e){for(const t of e)if(p(t).length>0)return t;return[]}function h(e){const t=[];for(const n of e.trim().split(/\s+/))if(/^\d+-$/.test(n))t[Number(n.slice(0,-1))-1]=!0;else if(/^\d+$/.test(n)){const e=Number(n);t[e-1]=!0,t[e]=void 0}else if(/^\d+-\d+$/.test(n)){const[e,o]=n.split("-",2).map(Number);for(let n=e-1;n<o;n++)t[n]=!0;t[o]=void 0}else if(/^-\d+$/.test(n)){const e=Number(n.slice(1));for(let n=0;n<e;n++)t[n]=!0;t[e]=void 0}return t}function m(e){const t=[],n=[];for(const[,o,i]of e.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g))t.push(o),n.push(i);const o=function(e){if(0===e.length)return[];const t=e.map(h),n=Math.max(...t.map((e=>e.length)));if(0===n)return[];for(const e of t)if(e.length<n){const t=e[e.length-1];for(let o=e.length;o<n;o++)e[o]=t}return t}(n);if(0===o.length)return[];const i=o[0].length,r=[];for(let e=0;e<i;e++)r[e]=[];for(let e=0;e<o.length;e++){const n=o[e],i=t[e],c=[],l=[];for(const e of i.trim().split(/\s+/)){if(0===e.length){l.push("invisible");break}e.startsWith("^")?l.push(e.slice(1)):c.push(e)}for(let e=0;e<n.length;e++)n[e]?r[e].push(...c):r[e].push(...l)}return r}function g(e){const t=[];for(const n of e.querySelectorAll("[data-slide]")){const e=n.getAttribute("data-slide");if(null===e)continue;const o=m(e);o.length>0&&t.push({element:n,classesArray:o})}return t}function v(e,t){for(;;){for(;null!==e.nextSibling;)e.nextSibling.remove();if(null===e.parentNode||e.parentNode===t)break;e=e.parentNode}}let b,w=[],y=0;const E=async(e,t)=>{const o=d("title",e.children);void 0!==o&&(l=o);const i=f("author",e.children);i.length>0&&(w=i);const r=d("date",e.children);void 0!==r&&(b=r),y++;const c=document.createElement("div");for(let o=0;;o++){const i=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),s=document.createElement("div"),a=document.createElement("main"),d=document.createElement("footer"),f=document.createElement("div"),p=document.createElement("div"),h=document.createElement("div"),m=document.createElement("div");if(c.append(i),i.append(r),r.append(s),s.append(a),s.append(d),a.append(await t.compileSTDN(e.children)),d.append(f),d.append(p),d.append(h),d.append(m),n.push(i),i.setAttribute("viewBox","0 0 1920 1080"),r.setAttribute("width","100%"),r.setAttribute("height","100%"),w.length>0){let e=new DocumentFragment;for(let n=0;n<w.length;n++){const o=w[n],{abbr:i}=o.options;"string"==typeof i?e.append(new Text(i)):"object"==typeof i?e.append(await t.compileLine(u(i))):e.append(await t.compileLine(u(o.children))),n<w.length-1&&e.append(new Text(", "))}f.append(e)}if(void 0!==l){const{abbr:e}=l.options;let n;n="string"==typeof e?new Text(e):"object"==typeof e?await t.compileLine(u(e)):await t.compileLine(u(l.children)),p.append(n)}if(void 0!==b){const{abbr:e}=b.options;let n;n="string"==typeof e?new Text(e):"object"==typeof e?await t.compileLine(u(e)):await t.compileLine(u(b.children)),h.append(n)}m.textContent=y.toString();let E=!1;const A=a.querySelectorAll(".unit.pause")[o];void 0!==A&&(v(A,a),E=!0);for(const{element:e,classesArray:t}of g(a))o<t.length-1&&(E=!0),e.classList.add(...t[Math.min(o,t.length-1)]);if(!E)break}return c},A=["download","href","hreflang","ping","referrerpolicy","rel","target","type"];function k(e){for(const t of e.querySelectorAll("a")){const e=document.createElement("span");for(const{name:n,value:o}of t.attributes)if(!A.includes(n))try{e.setAttribute(n,o)}catch(e){console.log(e)}for(const n of t.childNodes)e.append(n);t.replaceWith(e)}return e}const L=async(e,t)=>{const n=!0===e.options.pause,o=document.createElement("ul");let i,r=0,c=0;for(const e of t.context.indexInfoArray){if("heading"!==e.orbit||e.index.length>2)continue;const l=document.createElement("li"),s=document.createElement("a");l.append(s),s.append(k(await t.compileSTDN(e.unit.children))),s.href=`#${encodeURIComponent(e.id)}`,2!==e.index.length?(i=document.createElement("ul"),o.append(l),l.append(i),r++,c++,n&&r>1&&(l.dataset.slide=`${r}-`)):void 0!==i&&(i.append(l),c++)}return c>12&&o.classList.add("compact"),c>24&&o.classList.add("very-compact"),o};var x=t.mH,S=t.Wi,N=t.oL,j=t.Kl,D=t._R;export{x as extractSlidableElements,S as frame,N as listen,j as outline,D as parseSlideStr};