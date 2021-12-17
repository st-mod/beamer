import {UnitCompiler} from '@ddu6/stc'
import {STDN,STDNLine,STDNUnit} from 'stdn'
const slides:SVGElement[]=[]
let index=0
const history:(number|undefined)[]=[]
let historyIndex=-1
function go(newIndex:number){
    if(index!==newIndex||historyIndex===-1){
        history[++historyIndex]=index=newIndex
        history[historyIndex+1]=undefined
    }
    slides[index].scrollIntoView()
}
function up(){
    go((index-1+slides.length)%slides.length)
}
function down(){
    go((index+1)%slides.length)
}
function left(){
    let result=history[historyIndex-1]
    if(result!==undefined){
        index=result
        historyIndex--
        slides[index].scrollIntoView()
    }
}
function right(){
    let result=history[historyIndex+1]
    if(result!==undefined){
        index=result
        historyIndex++
        slides[index].scrollIntoView()
    }
}
function normalize(){
    for(let i=0;i<slides.length;i++){
        const {bottom}=slides[i].getBoundingClientRect()
        if(bottom>1){
            go(i)
            break
        }
    }
}
let showing=false
function show(){
    for(let i=0;i<slides.length;i++){
        const {top,height}=slides[i].getBoundingClientRect()
        if(top+height/2>=0){
            document.documentElement.classList.add('showing')
            go(i)
            showing=true
            break
        }
    }
}
function exit(){
    showing=false
    document.documentElement.classList.remove('showing')
    go(index)
}
export function listen(){
    addEventListener('keydown',e=>{
        if(slides.length===0){
            return
        }
        if(e.key==='Enter'){
            show()
            return
        }
        if(!showing){
            return
        }
        if(e.key==='Escape'){
            exit()
            return
        }
        if(e.key==='ArrowUp'||e.key==='PageUp'){
            e.preventDefault()
            up()
            return
        }
        if(e.key==='ArrowDown'||e.key==='PageDown'){
            e.preventDefault()
            down()
            return
        }
        if(e.key==='ArrowLeft'){
            e.preventDefault()
            left()
            return
        }
        if(e.key==='ArrowRight'){
            e.preventDefault()
            right()
            return
        }
    })
    addEventListener('scroll',()=>{
        if(showing){
            normalize()
        }
    })
}
function findUnit(tag:string,stdn:STDN):STDNUnit|undefined{
    for(const line of stdn){
        for(const unit of line){
            if(typeof unit==='string'){
                continue
            }
            if(unit.tag===tag){
                return unit
            }
            for(const key of Object.keys(unit.options)){
                const val=unit.options[key]
                if(typeof val==='object'){
                    const result=findUnit(tag,val)
                    if(result!==undefined){
                        return result
                    }
                }
            }
            const result=findUnit(tag,unit.children)
            if(result!==undefined){
                return result
            }
        }
    }
}
function findUnits(tag:string,stdn:STDN):STDNUnit[]{
    const out:STDNUnit[]=[]
    for(const line of stdn){
        for(const unit of line){
            if(typeof unit==='string'){
                continue
            }
            if(unit.tag===tag){
                out.push(unit)
            }
            for(const key of Object.keys(unit.options)){
                const val=unit.options[key]
                if(typeof val==='object'){
                    out.push(...findUnits(tag,val))
                }
            }
            out.push(...findUnits(tag,unit.children))
        }
    }
    return out
}
function stdnToInlinePlainString(stdn:STDN){
    for(const line of stdn){
        const string=lineToInlinePlainString(line)
        if(string.length>0){
            return string
        }
    }
    return ''
}
function lineToInlinePlainString(line:STDNLine){
    let string=''
    for(const inline of line){
        if(typeof inline==='string'){
            string+=inline
            continue
        }
        string+=unitToInlinePlainString(inline)
    }
    return string
}
function unitToInlinePlainString(unit:STDNUnit){
    return stdnToInlinePlainString(unit.children)
}
type SlideIndexes=(true|undefined)[]
function parseSlideIndexesStr(string:string){
    const array:SlideIndexes=[]
    for(const item of string.trim().split(/\s+/)){
        if(/^\d+-$/.test(item)){
            array[Number(item.slice(0,-1))-1]=true
            continue
        }
        if(/^\d+$/.test(item)){
            const e=Number(item)
            array[e-1]=true
            array[e]=undefined
            continue
        }
        if(/^\d+-\d+$/.test(item)){
            const [s,e]=item.split('-',2).map(Number)
            for(let i=s-1;i<e;i++){
                array[i]=true
            }
            array[e]=undefined
            continue
        }
        if(/^-\d+$/.test(item)){
            const e=Number(item.slice(1))
            for(let i=0;i<e;i++){
                array[i]=true
            }
            array[e]=undefined
            continue
        }
    }
    return array
}
function parseSlideIndexesStrs(strings:string[]){
    if(strings.length===0){
        return []
    }
    const out=strings.map(parseSlideIndexesStr)
    const length=Math.max(...out.map(val=>val.length))
    if(length===0){
        return []
    }
    for(const array of out){
        if(array.length<length){
            const last=array[array.length-1]
            for(let i=array.length;i<length;i++){
                array[i]=last
            }
        }
    }
    return out
}
export function parseSlideStr(string:string){
    const classStrs:string[]=[]
    const indexStrs:string[]=[]
    for(const [,classStr,indexStr] of string.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g)){
        classStrs.push(classStr)
        indexStrs.push(indexStr)
    }
    const indexesArray=parseSlideIndexesStrs(indexStrs)
    if(indexesArray.length===0){
        return []
    }
    const length=indexesArray[0].length
    const classesArray:string[][]=[]
    for(let i=0;i<length;i++){
        classesArray[i]=[]
    }
    for(let i=0;i<indexesArray.length;i++){
        const indexes=indexesArray[i]
        const classStr=classStrs[i]
        const classes:string[]=[]
        const rclasses:string[]=[]
        for(const className of classStr.trim().split(/\s+/)){
            if(className.length===0){
                rclasses.push('invisible')
                break
            }
            if(className.startsWith('^')){
                rclasses.push(className.slice(1))
                continue
            }
            classes.push(className)
        }
        for(let i=0;i<indexes.length;i++){
            if(indexes[i]){
                classesArray[i].push(...classes)
                continue
            }
            classesArray[i].push(...rclasses)
        }
    }
    return classesArray
}
export interface SlidableElement{
    element:Element
    classesArray:string[][]
}
export function extractSlidableElements(parent:Element){
    const out:SlidableElement[]=[]
    for(const element of parent.querySelectorAll('[data-slide]')){
        const string=element.getAttribute('data-slide')
        if(string===null){
            continue
        }
        const classesArray=parseSlideStr(string)
        if(classesArray.length>0){
            out.push({
                element,
                classesArray,
            })
        }
    }
    return out
}
function removeAfter(node:Node,parent:Node){
    while(true){
        while(true){
            if(node.nextSibling===null){
                break
            }
            node.nextSibling.remove()
        }
        if(node.parentNode===null||node.parentNode===parent){
            break
        }
        node=node.parentNode
    }
}
let title=''
let author=''
let date=''
let page=0
export const frame:UnitCompiler=async (unit,compiler)=>{
    const titleUnit=findUnit('title',unit.children)
    if(titleUnit!==undefined){
        if(typeof titleUnit.options.abbr==='string'){
            title=titleUnit.options.abbr
        }else{
            title=unitToInlinePlainString(titleUnit)
        }
    }
    const authorUnits=findUnits('author',unit.children)
    if(authorUnits.length>0){
        author=authorUnits.map(unit=>{
            if(typeof unit.options.abbr==='string'){
                return unit.options.abbr
            }
            return unitToInlinePlainString(unit)
        }).join(', ')
    }
    const dateUnit=findUnit('date',unit.children)
    if(dateUnit!==undefined){
        if(typeof dateUnit.options.abbr==='string'){
            date=dateUnit.options.abbr
        }else{
            date=unitToInlinePlainString(dateUnit)
        }
    }
    page++
    const element=document.createElement('div')
    for(let i=0;;i++){
        const slide=document.createElementNS('http://www.w3.org/2000/svg','svg')
        const fo=document.createElementNS('http://www.w3.org/2000/svg','foreignObject')
        const container=document.createElement('div')
        const main=document.createElement('main')
        const footer=document.createElement('footer')
        const authorEle=document.createElement('div')
        const titleEle=document.createElement('div')
        const dateEle=document.createElement('div')
        const pageEle=document.createElement('div')
        element.append(slide)
        slide.append(fo)
        fo.append(container)
        container.append(main)
        container.append(footer)
        main.append(await compiler.compileSTDN(unit.children))
        footer.append(authorEle)
        footer.append(titleEle)
        footer.append(dateEle)
        footer.append(pageEle)
        slides.push(slide)
        slide.setAttribute('viewBox','0 0 1920 1080')
        fo.setAttribute('width','100%')
        fo.setAttribute('height','100%')
        authorEle.textContent=author
        titleEle.textContent=title
        dateEle.textContent=date
        pageEle.textContent=page.toString()
        let more=false
        const pause=main.querySelectorAll('.unit.pause')[i]
        if(pause!==undefined){
            removeAfter(pause,main)
            more=true
        }
        for(const {element,classesArray} of extractSlidableElements(main)){
            if(i<classesArray.length-1){
                more=true
            }
            element.classList.add(...classesArray[Math.min(i,classesArray.length-1)])
        }
        if(!more){
            break
        }
    }
    return element
}
const avoidAttributes=[
    'download',
    'href',
    'hreflang',
    'ping',
    'referrerpolicy',
    'rel',
    'target',
    'type'
]
function replaceAnchors(fragment:DocumentFragment){
    for(const a of fragment.querySelectorAll('a')){
        const span=document.createElement('span')
        for(const {name,value} of a.attributes){
            if(avoidAttributes.includes(name)){
                continue
            }
            try{
                span.setAttribute(name,value)
            }catch(err){
                console.log(err)
            }
        }
        for(const child of a.childNodes){
            span.append(child)
        }
        a.replaceWith(span)
    }
    return fragment
}
export const outline:UnitCompiler=async (unit,compiler)=>{
    const pause=unit.options.pause===true
    const ul=document.createElement('ul')
    let sul:HTMLUListElement|undefined
    let count1=0
    let count2=0
    for(const indexInfo of compiler.context.indexInfoArray){
        if(indexInfo.orbit!=='heading'||indexInfo.index.length>2){
            continue
        }
        const li=document.createElement('li')
        const a=document.createElement('a')
        li.append(a)
        a.append(replaceAnchors(await compiler.compileSTDN(indexInfo.unit.children)))
        a.href=`#${encodeURIComponent(indexInfo.id)}`
        if(indexInfo.index.length===2){
            if(sul!==undefined){
                sul.append(li)
                count2++
            }
            continue
        }
        sul=document.createElement('ul')
        ul.append(li)
        li.append(sul)
        count1++
        count2++
        if(pause&&count1>1){
            li.dataset.slide=`${count1}-`
        }
    }
    if(count2>12){
        ul.classList.add('compact')
    }
    if(count2>24){
        ul.classList.add('very-compact')
    }
    return ul
}