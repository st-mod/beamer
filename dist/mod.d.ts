import type { STDNUnitOptions } from 'stdn';
import type { Compiler, IndexInfo, UnitCompiler } from '@ddu6/stc';
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
interface Env {
    readonly width: number;
    readonly height: number;
    readonly slides: SVGElement[];
    readonly authors: IndexInfo[];
    readonly date: IndexInfo | undefined;
    page: number;
}
export declare const compilerToEnv: Map<Compiler, Env | undefined>;
export declare const frame: UnitCompiler;
export declare const outline: UnitCompiler;
export declare const h0: UnitCompiler;
export {};
