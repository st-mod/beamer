import {UnitCompiler} from '@ddu6/stc'
import {STDN, STDNUnit} from 'stdn'
const slides:SVGElement[]=[]
let index=0
addEventListener('keydown',e=>{
    if(slides.length===0){
        return
    }
    if(e.key==='Enter'){
        for(let i=0;i<slides.length;i++){
            const {top,height}=slides[i].getBoundingClientRect()
            if(top+height/2>=0){
                index=i
                break
            }
        }
        slides[index].scrollIntoView()
        document.documentElement.classList.add('showing')
        return
    }
    if(e.key==='Escape'){
        document.documentElement.classList.remove('showing')
        return
    }
    if(e.key==='ArrowUp'||e.key==='PageUp'){
        e.preventDefault()
        slides[index=(index-1+slides.length)%slides.length].scrollIntoView()
        return
    }
    if(e.key==='ArrowDown'||e.key==='PageDown'){
        e.preventDefault()
        slides[index=(index+1)%slides.length].scrollIntoView()
        return
    }
})
export function findUnit(tag:string,stdn:STDN):STDNUnit|undefined{
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
export function findUnits(tag:string,stdn:STDN):STDNUnit[]{
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
export function unitToInlinePlainString(unit:STDNUnit){
    return stdnToInlinePlainString(unit.children)
}
export function stdnToInlinePlainString(stdn:STDN){
    if(stdn.length===0){
        return ''
    }
    let string=''
    for(const inline of stdn[0]){
        if(typeof inline==='string'){
            string+=inline
            continue
        }
        string+=unitToInlinePlainString(inline)
    }
    return string
}
export type SliceIndexes=(true|undefined)[]
export function parseSliceIndexesStr(string:string){
    const array:SliceIndexes=[]
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
export function parseSliceIndexesStrs(strings:string[]){
    if(strings.length===0){
        return []
    }
    const out=strings.map(parseSliceIndexesStr)
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
export function parseSlicesStr(string:string){
    const classStrs:string[]=[]
    const indexStrs:string[]=[]
    for(const [,classStr,indexStr] of string.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g)){
        classStrs.push(classStr)
        indexStrs.push(indexStr)
    }
    const indexesArray=parseSliceIndexesStrs(indexStrs)
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
    return classesArray.map(val=>val.join(' '))
}
export interface SliceableElement {
    element:Element
    classArray:string[]
}
export function extractSliceableElements(parent:Element){
    const out:SliceableElement[]=[]
    for(const element of parent.querySelectorAll('[data-slice]')){
        const string=element.getAttribute('data-slice')
        if(string===null){
            continue
        }
        const classArray=parseSlicesStr(string)
        if(classArray.length>0){
            out.push({
                element,
                classArray,
            })
        }
    }
    return out
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
        const slice=document.createElementNS('http://www.w3.org/2000/svg','svg')
        const fo=document.createElementNS('http://www.w3.org/2000/svg','foreignObject')
        const container=document.createElement('div')
        const main=document.createElement('main')
        const footer=document.createElement('footer')
        const authorEle=document.createElement('div')
        const titleEle=document.createElement('div')
        const dateEle=document.createElement('div')
        const pageEle=document.createElement('div')
        element.append(slice)
        slice.append(fo)
        fo.append(container)
        container.append(main)
        container.append(footer)
        main.append(await compiler.compileSTDN(unit.children))
        footer.append(authorEle)
        footer.append(titleEle)
        footer.append(dateEle)
        footer.append(pageEle)
        slides.push(slice)
        slice.setAttribute('viewBox','0 0 1920 1080')
        fo.setAttribute('width','100%')
        fo.setAttribute('height','100%')
        authorEle.textContent=author
        titleEle.textContent=title
        dateEle.textContent=date
        pageEle.textContent=page.toString()
        let more=false
        for(const {element,classArray} of extractSliceableElements(main)){
            if(i<classArray.length-1){
                more=true
            }
            const newClass=classArray[Math.min(i,classArray.length-1)]
            if(newClass.length>0){
                element.setAttribute(
                    'class',
                    (element.getAttribute('class')??'')+' '+newClass
                )
            }
        }
        if(!more){
            break
        }
    }
    return element
}