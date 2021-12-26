import { UnitCompiler } from '@ddu6/stc';
export declare function parseSlideStr(string: string): string[][];
export interface SlidableElement {
    element: Element;
    classesArray: string[][];
}
export declare function extractSlidableElements(parent: Element): SlidableElement[];
export declare function listen(): void;
export declare const frame: UnitCompiler;
export declare const outline: UnitCompiler;
export declare const h0: UnitCompiler;
