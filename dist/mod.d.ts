import { UnitCompiler } from '@ddu6/stc';
import { STDN, STDNUnit } from 'stdn';
export declare function findUnit(tag: string, stdn: STDN): STDNUnit | undefined;
export declare function findUnits(tag: string, stdn: STDN): STDNUnit[];
export declare function unitToInlinePlainString(unit: STDNUnit): string;
export declare function stdnToInlinePlainString(stdn: STDN): string;
export declare type SliceIndexes = (true | undefined)[];
export declare function parseSliceIndexesStr(string: string): SliceIndexes;
export declare function parseSliceIndexesStrs(strings: string[]): SliceIndexes[];
export declare function parseSlicesStr(string: string): string[];
export interface SliceableElement {
    element: Element;
    classArray: string[];
}
export declare function extractSliceableElements(parent: Element): SliceableElement[];
export declare const frame: UnitCompiler;
export declare const outline: UnitCompiler;
