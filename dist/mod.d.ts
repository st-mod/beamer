import type { STDNUnitOptions } from 'stdn';
import type { UnitCompiler } from '@ddu6/stc';
export declare const config: {
    listen: boolean;
    page: boolean;
};
interface Size {
    width: number;
    height: number;
}
export declare function parseLength(option: STDNUnitOptions[string]): number;
export declare function parseSize(option: STDNUnitOptions[string]): Size;
export declare function parseSlideStr(string: string): string[][];
export interface SlidableElement {
    element: Element;
    classesArray: string[][];
}
export declare function extractSlidableElements(parent: Element): SlidableElement[];
export declare const frame: UnitCompiler;
export declare const outline: UnitCompiler;
export declare const h0: UnitCompiler;
export {};
