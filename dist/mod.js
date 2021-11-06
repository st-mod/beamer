const slides = [];
let index = 0;
const history = [];
let historyIndex = -1;
export function go(newIndex) {
    if (index !== newIndex) {
        history[++historyIndex] = index = newIndex;
        history[historyIndex + 1] = undefined;
    }
    slides[index].scrollIntoView();
}
export function up() {
    go((index - 1 + slides.length) % slides.length);
}
export function down() {
    go((index + 1) % slides.length);
}
export function left() {
    let result = history[historyIndex - 1];
    if (result !== undefined) {
        index = result;
        historyIndex--;
        slides[index].scrollIntoView();
    }
}
export function right() {
    let result = history[historyIndex + 1];
    if (result !== undefined) {
        index = result;
        historyIndex++;
        slides[index].scrollIntoView();
    }
}
export function normalize() {
    for (let i = 0; i < slides.length; i++) {
        const { bottom } = slides[i].getBoundingClientRect();
        if (bottom > 0) {
            go(i);
            break;
        }
    }
}
export function show() {
    for (let i = 0; i < slides.length; i++) {
        const { top, height } = slides[i].getBoundingClientRect();
        if (top + height / 2 >= 0) {
            go(i);
            document.documentElement.classList.add('showing');
            break;
        }
    }
}
export function listen() {
    addEventListener('keydown', e => {
        if (slides.length === 0) {
            return;
        }
        if (e.key === 'Enter') {
            show();
            return;
        }
        if (!document.documentElement.classList.contains('showing')) {
            return;
        }
        if (e.key === 'Escape') {
            document.documentElement.classList.remove('showing');
            return;
        }
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            up();
            return;
        }
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            down();
            return;
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            left();
            return;
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            right();
            return;
        }
    });
    addEventListener('scroll', () => {
        if (document.documentElement.classList.contains('showing')) {
            normalize();
        }
    });
}
export function findUnit(tag, stdn) {
    for (const line of stdn) {
        for (const unit of line) {
            if (typeof unit === 'string') {
                continue;
            }
            if (unit.tag === tag) {
                return unit;
            }
            for (const key of Object.keys(unit.options)) {
                const val = unit.options[key];
                if (typeof val === 'object') {
                    const result = findUnit(tag, val);
                    if (result !== undefined) {
                        return result;
                    }
                }
            }
            const result = findUnit(tag, unit.children);
            if (result !== undefined) {
                return result;
            }
        }
    }
}
export function findUnits(tag, stdn) {
    const out = [];
    for (const line of stdn) {
        for (const unit of line) {
            if (typeof unit === 'string') {
                continue;
            }
            if (unit.tag === tag) {
                out.push(unit);
            }
            for (const key of Object.keys(unit.options)) {
                const val = unit.options[key];
                if (typeof val === 'object') {
                    out.push(...findUnits(tag, val));
                }
            }
            out.push(...findUnits(tag, unit.children));
        }
    }
    return out;
}
export function unitToInlinePlainString(unit) {
    return stdnToInlinePlainString(unit.children);
}
export function stdnToInlinePlainString(stdn) {
    if (stdn.length === 0) {
        return '';
    }
    let string = '';
    for (const inline of stdn[0]) {
        if (typeof inline === 'string') {
            string += inline;
            continue;
        }
        string += unitToInlinePlainString(inline);
    }
    return string;
}
export function parseSlideIndexesStr(string) {
    const array = [];
    for (const item of string.trim().split(/\s+/)) {
        if (/^\d+-$/.test(item)) {
            array[Number(item.slice(0, -1)) - 1] = true;
            continue;
        }
        if (/^\d+$/.test(item)) {
            const e = Number(item);
            array[e - 1] = true;
            array[e] = undefined;
            continue;
        }
        if (/^\d+-\d+$/.test(item)) {
            const [s, e] = item.split('-', 2).map(Number);
            for (let i = s - 1; i < e; i++) {
                array[i] = true;
            }
            array[e] = undefined;
            continue;
        }
        if (/^-\d+$/.test(item)) {
            const e = Number(item.slice(1));
            for (let i = 0; i < e; i++) {
                array[i] = true;
            }
            array[e] = undefined;
            continue;
        }
    }
    return array;
}
export function parseSlideIndexesStrs(strings) {
    if (strings.length === 0) {
        return [];
    }
    const out = strings.map(parseSlideIndexesStr);
    const length = Math.max(...out.map(val => val.length));
    if (length === 0) {
        return [];
    }
    for (const array of out) {
        if (array.length < length) {
            const last = array[array.length - 1];
            for (let i = array.length; i < length; i++) {
                array[i] = last;
            }
        }
    }
    return out;
}
export function parseSlideStr(string) {
    const classStrs = [];
    const indexStrs = [];
    for (const [, classStr, indexStr] of string.matchAll(/((?:\^?-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s+)*)([0-9-][0-9-\s]*)(?:\s+|$)/g)) {
        classStrs.push(classStr);
        indexStrs.push(indexStr);
    }
    const indexesArray = parseSlideIndexesStrs(indexStrs);
    if (indexesArray.length === 0) {
        return [];
    }
    const length = indexesArray[0].length;
    const classesArray = [];
    for (let i = 0; i < length; i++) {
        classesArray[i] = [];
    }
    for (let i = 0; i < indexesArray.length; i++) {
        const indexes = indexesArray[i];
        const classStr = classStrs[i];
        const classes = [];
        const rclasses = [];
        for (const className of classStr.trim().split(/\s+/)) {
            if (className.length === 0) {
                rclasses.push('invisible');
                break;
            }
            if (className.startsWith('^')) {
                rclasses.push(className.slice(1));
                continue;
            }
            classes.push(className);
        }
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i]) {
                classesArray[i].push(...classes);
                continue;
            }
            classesArray[i].push(...rclasses);
        }
    }
    return classesArray.map(val => val.join(' '));
}
export function extractSlidableElements(parent) {
    const out = [];
    for (const element of parent.querySelectorAll('[data-slide]')) {
        const string = element.getAttribute('data-slide');
        if (string === null) {
            continue;
        }
        const classArray = parseSlideStr(string);
        if (classArray.length > 0) {
            out.push({
                element,
                classArray,
            });
        }
    }
    return out;
}
let title = '';
let author = '';
let date = '';
let page = 0;
export const frame = async (unit, compiler) => {
    const titleUnit = findUnit('title', unit.children);
    if (titleUnit !== undefined) {
        if (typeof titleUnit.options.abbr === 'string') {
            title = titleUnit.options.abbr;
        }
        else {
            title = unitToInlinePlainString(titleUnit);
        }
    }
    const authorUnits = findUnits('author', unit.children);
    if (authorUnits.length > 0) {
        author = authorUnits.map(unit => {
            if (typeof unit.options.abbr === 'string') {
                return unit.options.abbr;
            }
            return unitToInlinePlainString(unit);
        }).join(', ');
    }
    const dateUnit = findUnit('date', unit.children);
    if (dateUnit !== undefined) {
        if (typeof dateUnit.options.abbr === 'string') {
            date = dateUnit.options.abbr;
        }
        else {
            date = unitToInlinePlainString(dateUnit);
        }
    }
    page++;
    const element = document.createElement('div');
    for (let i = 0;; i++) {
        const slide = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        const container = document.createElement('div');
        const main = document.createElement('main');
        const footer = document.createElement('footer');
        const authorEle = document.createElement('div');
        const titleEle = document.createElement('div');
        const dateEle = document.createElement('div');
        const pageEle = document.createElement('div');
        element.append(slide);
        slide.append(fo);
        fo.append(container);
        container.append(main);
        container.append(footer);
        main.append(await compiler.compileSTDN(unit.children));
        footer.append(authorEle);
        footer.append(titleEle);
        footer.append(dateEle);
        footer.append(pageEle);
        slides.push(slide);
        slide.setAttribute('viewBox', '0 0 1920 1080');
        fo.setAttribute('width', '100%');
        fo.setAttribute('height', '100%');
        authorEle.textContent = author;
        titleEle.textContent = title;
        dateEle.textContent = date;
        pageEle.textContent = page.toString();
        let more = false;
        for (const { element, classArray } of extractSlidableElements(main)) {
            if (i < classArray.length - 1) {
                more = true;
            }
            const newClass = classArray[Math.min(i, classArray.length - 1)];
            if (newClass.length > 0) {
                element.setAttribute('class', (element.getAttribute('class') ?? '') + ' ' + newClass);
            }
        }
        if (!more) {
            break;
        }
    }
    return element;
};
const avoidAttributes = [
    'download',
    'href',
    'hreflang',
    'ping',
    'referrerpolicy',
    'rel',
    'target',
    'type'
];
export function replaceAnchors(fragment) {
    for (const a of fragment.querySelectorAll('a')) {
        const span = document.createElement('span');
        for (const { name, value } of a.attributes) {
            if (avoidAttributes.includes(name)) {
                continue;
            }
            try {
                span.setAttribute(name, value);
            }
            catch (err) {
                console.log(err);
            }
        }
        for (const child of a.childNodes) {
            span.append(child);
        }
        a.replaceWith(span);
    }
    return fragment;
}
export const outline = async (unit, compiler) => {
    const pause = unit.options.pause === true;
    const ul = document.createElement('ul');
    let sul = document.createElement('ul');
    ul.append(sul);
    let count = 0;
    for (const indexInfo of compiler.context.indexInfoArray) {
        if (indexInfo.realOrbit !== 'heading' || indexInfo.index.length > 2) {
            continue;
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        li.append(a);
        a.append(replaceAnchors(await compiler.compileSTDN(indexInfo.unit.children)));
        a.href = `#${encodeURIComponent(indexInfo.id)}`;
        if (indexInfo.index.length === 2) {
            sul.append(li);
            continue;
        }
        sul = document.createElement('ul');
        ul.append(li);
        ul.append(sul);
        count++;
        if (pause && count > 1) {
            sul.dataset.slide = li.dataset.slide = `${count}-`;
        }
    }
    return ul;
};
