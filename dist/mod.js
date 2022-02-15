import { replaceAnchors } from 'st-std/dist/common';
export const config = {
    listen: false,
    page: false
};
const defaultWidth = 1920;
const defaultHeight = 1080;
export function parseLength(option) {
    if (typeof option !== 'string') {
        return NaN;
    }
    if (option.endsWith('px')) {
        return Number(option.slice(0, -2));
    }
    if (option.endsWith('cm')) {
        return Number(option.slice(0, -2)) * 96 / 2.54;
    }
    if (option.endsWith('mm')) {
        return Number(option.slice(0, -2)) * 96 / 25.4;
    }
    if (option.endsWith('in')) {
        return Number(option.slice(0, -2)) * 96;
    }
    if (option.endsWith('pc')) {
        return Number(option.slice(0, -2)) * 16;
    }
    if (option.endsWith('pt')) {
        return Number(option.slice(0, -2)) * 4 / 3;
    }
    return NaN;
}
export function parseSize(option) {
    if (typeof option !== 'string') {
        return {
            width: defaultWidth,
            height: defaultHeight
        };
    }
    if (option.endsWith(' landscape')) {
        const { width, height } = parseSize(option.slice(0, -10).trim());
        return {
            width: height,
            height: width
        };
    }
    if (option.endsWith(' portrait')) {
        return parseSize(option.slice(0, -9).trim());
    }
    if (option === 'A5') {
        return {
            width: parseLength('148mm'),
            height: parseLength('210mm')
        };
    }
    if (option === 'A4') {
        return {
            width: parseLength('210mm'),
            height: parseLength('297mm')
        };
    }
    if (option === 'A3') {
        return {
            width: parseLength('297mm'),
            height: parseLength('420mm')
        };
    }
    if (option === 'B5') {
        return {
            width: parseLength('176mm'),
            height: parseLength('250mm')
        };
    }
    if (option === 'B4') {
        return {
            width: parseLength('250mm'),
            height: parseLength('353mm')
        };
    }
    if (option === 'JIS-B5') {
        return {
            width: parseLength('182mm'),
            height: parseLength('257mm')
        };
    }
    if (option === 'JIS-B4') {
        return {
            width: parseLength('257mm'),
            height: parseLength('364mm')
        };
    }
    if (option === 'letter') {
        return {
            width: parseLength('8.5in'),
            height: parseLength('11in')
        };
    }
    if (option === 'legal') {
        return {
            width: parseLength('8.5in'),
            height: parseLength('14in')
        };
    }
    if (option === 'ledger') {
        return {
            width: parseLength('11in'),
            height: parseLength('17in')
        };
    }
    const [width, height] = option.trim().split(/\s+/, 2).map(parseLength);
    if (isFinite(width) && width > 0) {
        if (height === undefined) {
            return {
                width,
                height: width
            };
        }
        if (isFinite(height) && height > 0) {
            return {
                width,
                height
            };
        }
        return {
            width,
            height: defaultHeight
        };
    }
    if (isFinite(height) && height > 0) {
        return {
            width: defaultWidth,
            height
        };
    }
    return {
        width: defaultWidth,
        height: defaultHeight
    };
}
let style;
function setSize({ width, height }, root) {
    if (root !== undefined || !config.page) {
        return;
    }
    if (style === undefined) {
        style = document.createElement('style');
    }
    const css = `@media print {
    .unit.frame>svg {
        border: 0;
        margin: 0;
    }
}

@page {
    margin: 0;
    size: ${width}px ${height}px;
}`;
    if (style.textContent !== css) {
        style.textContent = css;
    }
    document.head.append(style);
}
function parseSlideIndexesStr(string) {
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
function parseSlideIndexesStrs(strings) {
    if (strings.length === 0) {
        return [];
    }
    const out = strings.map(parseSlideIndexesStr);
    const length = Math.max(...out.map(value => value.length));
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
    return classesArray;
}
export function extractSlidableElements(parent) {
    const out = [];
    for (const element of parent.querySelectorAll('[slide], [data-slide]')) {
        const string = element.getAttribute('slide') ?? element.getAttribute('data-slide');
        if (string === null) {
            continue;
        }
        const classesArray = parseSlideStr(string);
        if (classesArray.length > 0) {
            out.push({
                element,
                classesArray,
            });
        }
    }
    return out;
}
function listen(slides, root) {
    if (!config.listen || root !== undefined) {
        return;
    }
    let index = 0;
    const history = [];
    let historyIndex = -1;
    function go(newIndex) {
        if (index !== newIndex || historyIndex === -1) {
            history[++historyIndex] = index = newIndex;
            history[historyIndex + 1] = undefined;
        }
        slides[index].scrollIntoView();
    }
    function up() {
        go((index - 1 + slides.length) % slides.length);
    }
    function down() {
        go((index + 1) % slides.length);
    }
    function left() {
        let result = history[historyIndex - 1];
        if (result !== undefined) {
            index = result;
            historyIndex--;
            slides[index].scrollIntoView();
        }
    }
    function right() {
        let result = history[historyIndex + 1];
        if (result !== undefined) {
            index = result;
            historyIndex++;
            slides[index].scrollIntoView();
        }
    }
    function normalize() {
        for (let i = 0; i < slides.length; i++) {
            const { bottom } = slides[i].getBoundingClientRect();
            if (bottom > 1) {
                go(i);
                break;
            }
        }
    }
    let showing = false;
    function show() {
        for (let i = 0; i < slides.length; i++) {
            const { top, height } = slides[i].getBoundingClientRect();
            if (top + height / 2 >= 0) {
                document.documentElement.classList.add('showing');
                go(i);
                showing = true;
                break;
            }
        }
    }
    function exit() {
        showing = false;
        document.documentElement.classList.remove('showing');
        go(index);
    }
    addEventListener('keydown', e => {
        if (slides.length === 0 || !slides[0].isConnected) {
            return;
        }
        if (e.key === 'Enter') {
            show();
            return;
        }
        if (!showing) {
            return;
        }
        if (e.key === 'Escape') {
            exit();
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
        if (slides.length === 0 || !slides[0].isConnected) {
            return;
        }
        if (showing) {
            normalize();
        }
    });
}
function createEnv(context) {
    const slides = [];
    return {
        authors: context.indexInfoArray.filter(value => value.unit.tag === 'author'),
        date: context.indexInfoArray.find(value => value.unit.tag === 'date'),
        page: 0,
        size: parseSize(context.extractLastGlobalOption('size', 'frame')),
        slides
    };
}
export const compilerToEnv = new Map();
export const frame = async (unit, compiler) => {
    let env = compilerToEnv.get(compiler);
    if (env === undefined) {
        compilerToEnv.set(compiler, env = createEnv(compiler.context));
        setSize(env.size, compiler.context.root);
        listen(env.slides, compiler.context.root);
    }
    env.page++;
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
        slide.setAttribute('viewBox', `0 0 ${env.size.width} ${env.size.height}`);
        fo.setAttribute('width', '100%');
        fo.setAttribute('height', '100%');
        container.style.height = `${env.size.height}px`;
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
        env.slides.push(slide);
        for (const { unit } of env.authors) {
            const span = document.createElement('span');
            const { abbr } = unit.options;
            if (typeof abbr === 'string') {
                span.append(new Text(abbr));
            }
            else if (typeof abbr === 'object') {
                span.append(await compiler.compileUnit(abbr));
            }
            else {
                span.append(await compiler.compileLine(compiler.base.stdnToInlinePlainStringLine(unit.children)));
            }
            authorEle.append(span);
        }
        if (compiler.context.titleInfo !== undefined) {
            const { abbr } = compiler.context.titleInfo.unit.options;
            if (typeof abbr === 'string') {
                titleEle.append(new Text(abbr));
            }
            else if (typeof abbr === 'object') {
                titleEle.append(await compiler.compileUnit(abbr));
            }
            else {
                titleEle.append(await compiler.compileLine(compiler.base.stdnToInlinePlainStringLine(compiler.context.titleInfo.unit.children)));
            }
        }
        if (env.date !== undefined) {
            const { abbr } = env.date.unit.options;
            if (typeof abbr === 'string') {
                dateEle.append(new Text(abbr));
            }
            else if (typeof abbr === 'object') {
                dateEle.append(await compiler.compileUnit(abbr));
            }
            else {
                dateEle.append(await compiler.compileLine(compiler.base.stdnToInlinePlainStringLine(env.date.unit.children)));
            }
        }
        pageEle.textContent = env.page.toString();
        let more = false;
        const pause = main.querySelectorAll('.unit.pause')[i];
        if (pause !== undefined) {
            compiler.dom.removeAfter(pause, main);
            more = true;
        }
        for (const { element, classesArray } of extractSlidableElements(main)) {
            if (i < classesArray.length - 1) {
                more = true;
            }
            element.classList.add(...classesArray[Math.min(i, classesArray.length - 1)]);
        }
        if (!more) {
            break;
        }
    }
    return element;
};
export const outline = async (unit, compiler) => {
    const pause = unit.options.pause === true;
    const element = document.createElement('ul');
    let ul;
    let count = 0;
    for (const { id, index, unit } of compiler.context.headings) {
        if (index.length > 2) {
            continue;
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        li.append(a);
        a.append(replaceAnchors(await compiler.compileLine(compiler.base.stdnToInlinePlainStringLine(unit.children))));
        a.href = `#${encodeURIComponent(id)}`;
        if (index.length === 2) {
            if (ul !== undefined) {
                ul.append(li);
            }
            continue;
        }
        ul = document.createElement('ul');
        element.append(li);
        li.append(ul);
        count++;
        if (pause && count > 1) {
            li.setAttribute('slide', `${count}-`);
        }
    }
    return element;
};
export const h0 = async (unit, compiler) => {
    const element = document.createElement('h1');
    element.append(await compiler.compileSTDN(unit.children));
    return element;
};
