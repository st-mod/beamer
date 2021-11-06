import { UnitCompiler } from '@ddu6/stc';
import { STDN, STDNUnit } from 'stdn';
export declare function listen(): void;
export declare function findUnit(tag: string, stdn: STDN): STDNUnit | undefined;
export declare function findUnits(tag: string, stdn: STDN): STDNUnit[];
export declare function unitToInlinePlainString(unit: STDNUnit): string;
export declare function stdnToInlinePlainString(stdn: STDN): string;
export declare type SlideIndexes = (true | undefined)[];
export declare function parseSlideIndexesStr(string: string): SlideIndexes;
export declare function parseSlideIndexesStrs(strings: string[]): SlideIndexes[];
export declare function parseSlideStr(string: string): string[];
export interface SlidableElement {
    element: Element;
    classArray: string[];
}
export declare function extractSlidableElements(parent: Element): SlidableElement[];
export declare const frame: UnitCompiler;
export declare function jumpTo(id: string): void;
export declare const a: UnitCompiler;
export declare const outline: UnitCompiler;
