var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{vc:()=>o,mH:()=>d,Wi:()=>w,h0:()=>b,Kl:()=>v,$F:()=>r,_8:()=>s,_R:()=>l});const n=["download","href","hreflang","ping","referrerpolicy","rel","target","type"];function i(e){for(const t of e.querySelectorAll("a")){const e=document.createElement("span");for(const{name:i,value:o}of t.attributes)if(!n.includes(i))try{e.setAttribute(i,o)}catch(e){console.log(e)}for(const n of t.childNodes)e.append(n);t.replaceWith(e)}return e}const o={listen:!1,page:!1};function r(e){return"string"!=typeof e?NaN:e.endsWith("px")?Number(e.slice(0,-2)):e.endsWith("cm")?96*Number(e.slice(0,-2))/2.54:e.endsWith("mm")?96*Number(e.slice(0,-2))/25.4:e.endsWith("in")?96*Number(e.slice(0,-2)):e.endsWith("pc")?16*Number(e.slice(0,-2)):e.endsWith("pt")?4*Number(e.slice(0,-2))/3:NaN}function s(e){if("string"!=typeof e)return{width:1920,height:1080};if(e.endsWith(" landscape")){const{width:t,height:n}=s(e.slice(0,-10).trim());return{width:n,height:t}}if(e.endsWith(" portrait"))return s(e.slice(0,-9).trim());if("A5"===e)return{width:r("148mm"),height:r("210mm")};if("A4"===e)return{width:r("210mm"),height:r("297mm")};if("A3"===e)return{width:r("297mm"),height:r("420mm")};if("B5"===e)return{width:r("176mm"),height:r("250mm")};if("B4"===e)return{width:r("250mm"),height:r("353mm")};if("JIS-B5"===e)return{width:r("182mm"),height:r("257mm")};if("JIS-B4"===e)return{width:r("257mm"),height:r("364mm")};if("letter"===e)return{width:r("8.5in"),height:r("11in")};if("legal"===e)return{width:r("8.5in"),height:r("14in")};if("ledger"===e)return{width:r("11in"),height:r("17in")};const[t,n]=e.trim().split(/\s+/,2).map(r);return isFinite(t)&&t>0?void 0===n?{width:t,height:t}:isFinite(n)&&n>0?{width:t,height:n}:{width:t,height:1080}:isFinite(n)&&n>0?{width:1920,height:n}:{width:1920,height:1080}}const c=new Map;function a(e){const t=[];for(const n of e.trim().split(/\s+/))if(/^\d+-$/.test(n))t[Number(n.slice(0,-1))-1]=!0;else if(/^\d+$/.test(n)){const e=Number(n);t[e-1]=!0,t[e]=void 0}else if(/^\d+-\d+$/.test(n)){const[e,i]=n.split("-",2).map(Number);for(let n=e-1;n<i;n++)t[n]=!0;t[i]=void 0}else if(/^-\d+$/.test(n)){const e=Number(n.slice(1));for(let n=0;n<e;n++)t[n]=!0;t[e]=void 0}return t}function l(e){const t=[],n=[];for(const[,i,o]of e.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g))t.push(i),n.push(o);const i=function(e){if(0===e.length)return[];const t=e.map(a),n=Math.max(...t.map((e=>e.length)));if(0===n)return[];for(const e of t)if(e.length<n){const t=e[e.length-1];for(let i=e.length;i<n;i++)e[i]=t}return t}(n);if(0===i.length)return[];const o=i[0].length,r=[];for(let e=0;e<o;e++)r[e]=[];for(let e=0;e<i.length;e++){const n=i[e],o=t[e],s=[],c=[];for(const e of o.trim().split(/\s+/)){if(0===e.length){c.push("invisible");break}e.startsWith("^")?c.push(e.slice(1)):s.push(e)}for(let e=0;e<n.length;e++)n[e]?r[e].push(...s):r[e].push(...c)}return r}function d(e){const t=[];for(const n of e.querySelectorAll("[data-slide]")){const e=n.getAttribute("data-slide");if(null===e)continue;const i=l(e);i.length>0&&t.push({element:n,classesArray:i})}return t}function p(e,t){for(;;){for(;null!==e.nextSibling;)e.nextSibling.remove();if(null===e.parentNode||e.parentNode===t)break;e=e.parentNode}}function h(e,t){for(const n of t)for(const t of n){if("string"==typeof t)continue;if(t.tag===e)return t;for(const n of Object.keys(t.options)){const i=t.options[n];if("object"==typeof i){const t=h(e,i);if(void 0!==t)return t}}const n=h(e,t.children);if(void 0!==n)return n}}function f(e,t){const n=[];for(const i of t)for(const t of i)if("string"!=typeof t){t.tag===e&&n.push(t);for(const i of Object.keys(t.options)){const o=t.options[i];"object"==typeof o&&n.push(...f(e,o))}n.push(...f(e,t.children))}return n}function u(e,t){for(const n of e)if(t.base.lineToInlinePlainString(n).length>0)return n;return[]}const m=new Map;const g=new Map,w=async(e,t)=>{let n=g.get(t);if(void 0===n){const e=s(t.extractor.extractLastGlobalOption("size","frame",t.context.tagToGlobalOptions));g.set(t,n={width:e.width,height:e.height,slides:[],author:[],page:0}),function({width:e,height:t},n){if(c.get(n))return;c.set(n,!0);const i=n instanceof ShadowRoot,r=document.createElement("style");r.textContent=`${o.page&&!i?`@media print {\n            .unit.frame>svg {\n                border: 0;\n                margin: 0;\n            }\n        }\n        \n        @page {\n            margin: 0;\n            size: ${e}px ${t}px;\n        }\n        \n        `:""}.unit.frame>svg>foreignObject>div {\n        height: ${t}px;\n    }\n    \n    .unit.frame .unit.outline.compact {\n        max-height: ${7*t/9}px;\n    }`,i?n.append(r):n.document.head.append(r)}(e,t.context.root),function(e,t){if(!o.listen||t instanceof ShadowRoot||m.get(t))return;m.set(t,!0);let n=0;const i=[];let r=-1;function s(t){n===t&&-1!==r||(i[++r]=n=t,i[r+1]=void 0),e[n].scrollIntoView()}let c=!1;t.addEventListener("keydown",(t=>{if(0!==e.length)if("Enter"!==t.key){if(c)return"Escape"===t.key?(c=!1,document.documentElement.classList.remove("showing"),void s(n)):"ArrowUp"===t.key||"PageUp"===t.key?(t.preventDefault(),void s((n-1+e.length)%e.length)):"ArrowDown"===t.key||"PageDown"===t.key?(t.preventDefault(),void s((n+1)%e.length)):"ArrowLeft"===t.key?(t.preventDefault(),void function(){let t=i[r-1];void 0!==t&&(n=t,r--,e[n].scrollIntoView())}()):"ArrowRight"===t.key?(t.preventDefault(),void function(){let t=i[r+1];void 0!==t&&(n=t,r++,e[n].scrollIntoView())}()):void 0}else!function(){for(let t=0;t<e.length;t++){const{top:n,height:i}=e[t].getBoundingClientRect();if(n+i/2>=0){document.documentElement.classList.add("showing"),s(t),c=!0;break}}}()})),t.addEventListener("scroll",(()=>{c&&function(){for(let t=0;t<e.length;t++){const{bottom:n}=e[t].getBoundingClientRect();if(n>1){s(t);break}}}()}))}(n.slides,t.context.root)}const i=h("title",e.children);void 0!==i&&(n.title=i);const r=f("author",e.children);r.length>0&&(n.author=r);const a=h("date",e.children);void 0!==a&&(n.date=a),n.page++;const l=document.createElement("div");for(let i=0;;i++){const o=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),s=document.createElement("div"),c=document.createElement("main"),a=document.createElement("footer"),h=document.createElement("div"),f=document.createElement("div"),m=document.createElement("div"),g=document.createElement("div");o.setAttribute("viewBox",`0 0 ${n.width} ${n.height}`),r.setAttribute("width","100%"),r.setAttribute("height","100%"),l.append(o),o.append(r),r.append(s),s.append(c),s.append(a),c.append(await t.compileSTDN(e.children)),a.append(h),a.append(f),a.append(m),a.append(g),n.slides.push(o);for(const e of n.author){const n=document.createElement("span"),{abbr:i}=e.options;"string"==typeof i?n.append(new Text(i)):"object"==typeof i?n.append(await t.compileLine(u(i,t))):n.append(await t.compileLine(u(e.children,t))),h.append(n)}if(void 0!==n.title){const{abbr:e}=n.title.options;"string"==typeof e?f.append(new Text(e)):"object"==typeof e?f.append(await t.compileLine(u(e,t))):f.append(await t.compileLine(u(n.title.children,t)))}if(void 0!==n.date){const{abbr:e}=n.date.options;"string"==typeof e?m.append(new Text(e)):"object"==typeof e?m.append(await t.compileLine(u(e,t))):m.append(await t.compileLine(u(n.date.children,t)))}g.textContent=n.page.toString();let w=!1;const v=c.querySelectorAll(".unit.pause")[i];void 0!==v&&(p(v,c),w=!0);for(const{element:e,classesArray:t}of d(c))i<t.length-1&&(w=!0),e.classList.add(...t[Math.min(i,t.length-1)]);if(!w)break}return l},v=async(e,t)=>{const n=!0===e.options.pause,o=document.createElement("ul");let r,s=0,c=0;for(const e of t.context.indexInfoArray){if("heading"!==e.orbit||e.index.length>2)continue;const a=document.createElement("li"),l=document.createElement("a");a.append(l),l.append(i(await t.compileLine(u(e.unit.children,t)))),l.href=`#${encodeURIComponent(e.id)}`,2!==e.index.length?(r=document.createElement("ul"),o.append(a),a.append(r),s++,c++,n&&s>1&&(a.dataset.slide=`${s}-`)):void 0!==r&&(r.append(a),c++)}return c>12&&o.classList.add("compact"),c>24&&o.classList.add("very-compact"),o},b=async(e,t)=>{const n=document.createElement("h1");return n.append(await t.compileSTDN(e.children)),n};var y=t.vc,x=t.mH,E=t.Wi,N=t.h0,A=t.Kl,S=t.$F,L=t._8,k=t._R;export{y as config,x as extractSlidableElements,E as frame,N as h0,A as outline,S as parseLength,L as parseSize,k as parseSlideStr};