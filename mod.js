var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{i0:()=>h,vc:()=>o,mH:()=>d,Wi:()=>p,h0:()=>m,Kl:()=>u,$F:()=>r,_8:()=>s,_R:()=>c});const n=["download","href","hreflang","ping","referrerpolicy","rel","target","type"];function i(e){for(const t of e.querySelectorAll("a")){const e=document.createElement("span");for(const{name:i,value:o}of t.attributes)if(!n.includes(i))try{e.setAttribute(i,o)}catch(e){console.log(e)}for(const n of t.childNodes)e.append(n);t.replaceWith(e)}return e}const o={listen:!1,page:!1};function r(e){return"string"!=typeof e?NaN:e.endsWith("px")?Number(e.slice(0,-2)):e.endsWith("cm")?96*Number(e.slice(0,-2))/2.54:e.endsWith("mm")?96*Number(e.slice(0,-2))/25.4:e.endsWith("in")?96*Number(e.slice(0,-2)):e.endsWith("pc")?16*Number(e.slice(0,-2)):e.endsWith("pt")?4*Number(e.slice(0,-2))/3:NaN}function s(e){if("string"!=typeof e)return{width:1920,height:1080};if(e.endsWith(" landscape")){const{width:t,height:n}=s(e.slice(0,-10).trim());return{width:n,height:t}}if(e.endsWith(" portrait"))return s(e.slice(0,-9).trim());if("A5"===e)return{width:r("148mm"),height:r("210mm")};if("A4"===e)return{width:r("210mm"),height:r("297mm")};if("A3"===e)return{width:r("297mm"),height:r("420mm")};if("B5"===e)return{width:r("176mm"),height:r("250mm")};if("B4"===e)return{width:r("250mm"),height:r("353mm")};if("JIS-B5"===e)return{width:r("182mm"),height:r("257mm")};if("JIS-B4"===e)return{width:r("257mm"),height:r("364mm")};if("letter"===e)return{width:r("8.5in"),height:r("11in")};if("legal"===e)return{width:r("8.5in"),height:r("14in")};if("ledger"===e)return{width:r("11in"),height:r("17in")};const[t,n]=e.trim().split(/\s+/,2).map(r);return isFinite(t)&&t>0?void 0===n?{width:t,height:t}:isFinite(n)&&n>0?{width:t,height:n}:{width:t,height:1080}:isFinite(n)&&n>0?{width:1920,height:n}:{width:1920,height:1080}}let a;function l(e){const t=[];for(const n of e.trim().split(/\s+/))if(/^\d+-$/.test(n))t[Number(n.slice(0,-1))-1]=!0;else if(/^\d+$/.test(n)){const e=Number(n);t[e-1]=!0,t[e]=void 0}else if(/^\d+-\d+$/.test(n)){const[e,i]=n.split("-",2).map(Number);for(let n=e-1;n<i;n++)t[n]=!0;t[i]=void 0}else if(/^-\d+$/.test(n)){const e=Number(n.slice(1));for(let n=0;n<e;n++)t[n]=!0;t[e]=void 0}return t}function c(e){const t=[],n=[];for(const[,i,o]of e.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g))t.push(i),n.push(o);const i=function(e){if(0===e.length)return[];const t=e.map(l),n=Math.max(...t.map((e=>e.length)));if(0===n)return[];for(const e of t)if(e.length<n){const t=e[e.length-1];for(let i=e.length;i<n;i++)e[i]=t}return t}(n);if(0===i.length)return[];const o=i[0].length,r=[];for(let e=0;e<o;e++)r[e]=[];for(let e=0;e<i.length;e++){const n=i[e],o=t[e],s=[],a=[];for(const e of o.trim().split(/\s+/)){if(0===e.length){a.push("invisible");break}e.startsWith("^")?a.push(e.slice(1)):s.push(e)}for(let e=0;e<n.length;e++)n[e]?r[e].push(...s):r[e].push(...a)}return r}function d(e){const t=[];for(const n of e.querySelectorAll("[slide], [data-slide]")){const e=n.getAttribute("slide")??n.getAttribute("data-slide");if(null===e)continue;const i=c(e);i.length>0&&t.push({element:n,classesArray:i})}return t}const h=new Map,p=async(e,t)=>{let n=h.get(t);void 0===n&&(h.set(t,n=function(e){const t=s(e.extractLastGlobalOption("size","frame"));return{authors:e.indexInfoArray.filter((e=>"author"===e.unit.tag)),date:e.indexInfoArray.find((e=>"date"===e.unit.tag)),page:0,size:t,slides:[]}}(t.context)),function({width:e,height:t},n){if(void 0!==n||!o.page)return;void 0===a&&(a=document.createElement("style"));const i=`@media print {\n    .unit.frame>svg {\n        border: 0;\n        margin: 0;\n    }\n}\n\n@page {\n    margin: 0;\n    size: ${e}px ${t}px;\n}`;a.textContent!==i&&(a.textContent=i),document.head.append(a)}(n.size,t.context.root),function(e,t){if(!o.listen||void 0!==t)return;let n=0;const i=[];let r=-1;function s(t){n===t&&-1!==r||(i[++r]=n=t,i[r+1]=void 0),e[n].scrollIntoView()}let a=!1;addEventListener("keydown",(t=>{if(0!==e.length&&e[0].isConnected)if("Enter"!==t.key){if(a)return"Escape"===t.key?(a=!1,document.documentElement.classList.remove("showing"),void s(n)):"ArrowUp"===t.key||"PageUp"===t.key?(t.preventDefault(),void s((n-1+e.length)%e.length)):"ArrowDown"===t.key||"PageDown"===t.key?(t.preventDefault(),void s((n+1)%e.length)):"ArrowLeft"===t.key?(t.preventDefault(),void function(){let t=i[r-1];void 0!==t&&(n=t,r--,e[n].scrollIntoView())}()):"ArrowRight"===t.key?(t.preventDefault(),void function(){let t=i[r+1];void 0!==t&&(n=t,r++,e[n].scrollIntoView())}()):void 0}else!function(){for(let t=0;t<e.length;t++){const{top:n,height:i}=e[t].getBoundingClientRect();if(n+i/2>=0){document.documentElement.classList.add("showing"),s(t),a=!0;break}}}()})),addEventListener("scroll",(()=>{0!==e.length&&e[0].isConnected&&a&&function(){for(let t=0;t<e.length;t++){const{bottom:n}=e[t].getBoundingClientRect();if(n>1){s(t);break}}}()}))}(n.slides,t.context.root)),n.page++;const i=document.createElement("div");for(let o=0;;o++){const r=document.createElementNS("http://www.w3.org/2000/svg","svg"),s=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),a=document.createElement("div"),l=document.createElement("main"),c=document.createElement("footer"),h=document.createElement("div"),p=document.createElement("div"),u=document.createElement("div"),m=document.createElement("div");r.setAttribute("viewBox",`0 0 ${n.size.width} ${n.size.height}`),s.setAttribute("width","100%"),s.setAttribute("height","100%"),a.style.height=`${n.size.height}px`,i.append(r),r.append(s),s.append(a),a.append(l),a.append(c),l.append(await t.compileSTDN(e.children)),c.append(h),c.append(p),c.append(u),c.append(m),n.slides.push(r);for(const{unit:e}of n.authors){const n=document.createElement("span"),{abbr:i}=e.options;"string"==typeof i?n.append(new Text(i)):"object"==typeof i?n.append(await t.compileUnit(i)):n.append(await t.compileLine(t.base.stdnToInlinePlainStringLine(e.children))),h.append(n)}if(void 0!==t.context.titleInfo){const{abbr:e}=t.context.titleInfo.unit.options;"string"==typeof e?p.append(new Text(e)):"object"==typeof e?p.append(await t.compileUnit(e)):p.append(await t.compileLine(t.base.stdnToInlinePlainStringLine(t.context.titleInfo.unit.children)))}if(void 0!==n.date){const{abbr:e}=n.date.unit.options;"string"==typeof e?u.append(new Text(e)):"object"==typeof e?u.append(await t.compileUnit(e)):u.append(await t.compileLine(t.base.stdnToInlinePlainStringLine(n.date.unit.children)))}m.textContent=n.page.toString();let f=!1;const g=l.querySelectorAll(".unit.pause")[o];void 0!==g&&(t.dom.removeAfter(g,l),f=!0);for(const{element:e,classesArray:t}of d(l))o<t.length-1&&(f=!0),e.classList.add(...t[Math.min(o,t.length-1)]);if(!f)break}return i},u=async(e,t)=>{const n=!0===e.options.pause,o=document.createElement("ul");let r,s=0;for(const{id:e,index:a,unit:l}of t.context.headings){if(a.length>2)continue;const c=document.createElement("li"),d=document.createElement("a");c.append(d),d.append(i(await t.compileLine(t.base.stdnToInlinePlainStringLine(l.children)))),d.href=`#${encodeURIComponent(e)}`,2!==a.length?(r=document.createElement("ul"),o.append(c),c.append(r),s++,n&&s>1&&c.setAttribute("slide",`${s}-`)):void 0!==r&&r.append(c)}return o},m=async(e,t)=>{const n=document.createElement("h1");return n.append(await t.compileSTDN(e.children)),n};var f=t.i0,g=t.vc,w=t.mH,v=t.Wi,b=t.h0,y=t.Kl,E=t.$F,x=t._8,A=t._R;export{f as compilerToEnv,g as config,w as extractSlidableElements,v as frame,b as h0,y as outline,E as parseLength,x as parseSize,A as parseSlideStr};