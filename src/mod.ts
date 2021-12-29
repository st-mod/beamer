import type {STDN,STDNUnit,STDNUnitOptions} from 'stdn'
import type {Compiler,UnitCompiler} from '@ddu6/stc'
import {replaceAnchors} from 'st-std/dist/common'
export const config={
    listen:false,
    page:false
}
const defaultWidth=1920
const defaultHeight=1080
interface Size{
    width:number
    height:number
}
type SlideIndexes=(true|undefined)[]
export function parseLength(option:STDNUnitOptions[string]){
    if(typeof option!=='string'){
        return NaN
    }
    if(option.endsWith('px')){
        return Number(option.slice(0,-2))
    }
    if(option.endsWith('cm')){
        return Number(option.slice(0,-2))*96/2.54
    }
    if(option.endsWith('mm')){
        return Number(option.slice(0,-2))*96/25.4
    }
    if(option.endsWith('in')){
        return Number(option.slice(0,-2))*96
    }
    if(option.endsWith('pc')){
        return Number(option.slice(0,-2))*16
    }
    if(option.endsWith('pt')){
        return Number(option.slice(0,-2))*4/3
    }
    return NaN
}
export function parseSize(option:STDNUnitOptions[string]):Size{
    if(typeof option!=='string'){
        return {
            width:defaultWidth,
            height:defaultHeight
        }
    }
    if(option.endsWith(' landscape')){
        const {width,height}=parseSize(option.slice(0,-10).trim())
        return {
            width:height,
            height:width
        }
    }
    if(option.endsWith(' portrait')){
        return parseSize(option.slice(0,-9).trim())
    }
    if(option==='A5'){
        return {
            width:parseLength('148mm'),
            height:parseLength('210mm')
        }
    }
    if(option==='A4'){
        return {
            width:parseLength('210mm'),
            height:parseLength('297mm')
        }
    }
    if(option==='A3'){
        return {
            width:parseLength('297mm'),
            height:parseLength('420mm')
        }
    }
    if(option==='B5'){
        return {
            width:parseLength('176mm'),
            height:parseLength('250mm')
        }
    }
    if(option==='B4'){
        return {
            width:parseLength('250mm'),
            height:parseLength('353mm')
        }
    }
    if(option==='JIS-B5'){
        return {
            width:parseLength('182mm'),
            height:parseLength('257mm')
        }
    }
    if(option==='JIS-B4'){
        return {
            width:parseLength('257mm'),
            height:parseLength('364mm')
        }
    }
    if(option==='letter'){
        return {
            width:parseLength('8.5in'),
            height:parseLength('11in')
        }
    }
    if(option==='legal'){
        return {
            width:parseLength('8.5in'),
            height:parseLength('14in')
        }
    }
    if(option==='ledger'){
        return {
            width:parseLength('11in'),
            height:parseLength('17in')
        }
    }
    const [width,height]=option.trim().split(/\s+/,2).map(parseLength)
    if(isFinite(width)&&width>0){
        if(height===undefined){
            return {
                width,
                height:width
            }
        }
        if(isFinite(height)&&height>0){
            return {
                width,
                height
            }
        }
        return {
            width,
            height:defaultHeight
        }
    }
    return {
        width:defaultWidth,
        height:defaultHeight
    }
}
const rootToSized=new Map<Compiler['context']['root'],true|undefined>()
function setSize({width,height}:Size,root:Compiler['context']['root']){
    if(rootToSized.get(root)){
        return
    }
    rootToSized.set(root,true)
    const shadow=root instanceof ShadowRoot
    const style=document.createElement('style')
    style.textContent=`${
        config.page&&!shadow?`@media print {
            .unit.frame>svg {
                border: 0;
                margin: 0;
            }
        }
        
        @page {
            margin: 0;
            size: ${width}px ${height}px;
        }
        
        `:''
    }.unit.frame>svg>foreignObject>div {
        height: ${height}px;
    }
    
    .unit.frame .unit.outline.compact {
        max-height: ${height*7/9}px;
    }`
    if(shadow){
        root.append(style)
        return
    }
    root.document.head.append(style)
}
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
function stdnToInlinePlainStringLine(stdn:STDN,compiler:Compiler){
    for(const line of stdn){
        const string=compiler.base.lineToInlinePlainString(line)
        if(string.length>0){
            return line
        }
    }
    return []
}
const rootToListened=new Map<Compiler['context']['root'],true|undefined>()
function listen(slides:SVGElement[],root:Compiler['context']['root']){
    if(!config.listen||root instanceof ShadowRoot||rootToListened.get(root)){
        return
    }
    rootToListened.set(root,true)
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
    root.addEventListener('keydown',e=>{
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
    root.addEventListener('scroll',()=>{
        if(showing){
            normalize()
        }
    })
}
interface Env{
    readonly width:number
    readonly height:number
    readonly slides:SVGElement[]
    title?:STDNUnit
    author:STDNUnit[]
    date?:STDNUnit
    page:number
}
const compilerToEnv=new Map<Compiler,Env|undefined>()
export const frame:UnitCompiler=async (unit,compiler)=>{
    let env=compilerToEnv.get(compiler)
    if(env===undefined){
        const size=parseSize(compiler.extractor.extractLastGlobalOption('size','frame',compiler.context.tagToGlobalOptions))
        compilerToEnv.set(compiler,env={
            width:size.width,
            height:size.height,
            slides:[],
            author:[],
            page:0
        })
        setSize(size,compiler.context.root)
        listen(env.slides,compiler.context.root)
    }
    const titleUnit=findUnit('title',unit.children)
    if(titleUnit!==undefined){
        env.title=titleUnit
    }
    const authorUnits=findUnits('author',unit.children)
    if(authorUnits.length>0){
        env.author=authorUnits
    }
    const dateUnit=findUnit('date',unit.children)
    if(dateUnit!==undefined){
        env.date=dateUnit
    }
    env.page++
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
        slide.setAttribute('viewBox',`0 0 ${env.width} ${env.height}`)
        fo.setAttribute('width','100%')
        fo.setAttribute('height','100%')
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
        env.slides.push(slide)
        for(const unit of env.author){
            const span=document.createElement('span')
            const {abbr}=unit.options
            if(typeof abbr==='string'){
                span.append(new Text(abbr))
            }else if(typeof abbr==='object'){
                span.append(await compiler.compileLine(stdnToInlinePlainStringLine(abbr,compiler)))
            }else{
                span.append(await compiler.compileLine(stdnToInlinePlainStringLine(unit.children,compiler)))
            }
            authorEle.append(span)
        }
        if(env.title!==undefined){
            const {abbr}=env.title.options
            if(typeof abbr==='string'){
                titleEle.append(new Text(abbr))
            }else if(typeof abbr==='object'){
                titleEle.append(await compiler.compileLine(stdnToInlinePlainStringLine(abbr,compiler)))
            }else{
                titleEle.append(await compiler.compileLine(stdnToInlinePlainStringLine(env.title.children,compiler)))
            }
        }
        if(env.date!==undefined){
            const {abbr}=env.date.options
            if(typeof abbr==='string'){
                dateEle.append(new Text(abbr))
            }else if(typeof abbr==='object'){
                dateEle.append(await compiler.compileLine(stdnToInlinePlainStringLine(abbr,compiler)))
            }else{
                dateEle.append(await compiler.compileLine(stdnToInlinePlainStringLine(env.date.children,compiler)))
            }
        }
        pageEle.textContent=env.page.toString()
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
        a.append(replaceAnchors(await compiler.compileLine(stdnToInlinePlainStringLine(indexInfo.unit.children,compiler))))
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
export const h0:UnitCompiler=async (unit,compiler)=>{
    const element=document.createElement('h1')
    element.append(await compiler.compileSTDN(unit.children))
    return element
}