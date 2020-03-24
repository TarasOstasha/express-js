import { EventEmitter, TemplateRef, SimpleChanges } from '@angular/core';
export interface SelectedItemInterface {
    item: any;
    index: number;
    first: boolean;
}
export declare class Ng2Carouselamos {
    items: Array<any>;
    width: number;
    $prev: TemplateRef<any>;
    $next: TemplateRef<any>;
    $item: TemplateRef<any>;
    onSelectedItem: EventEmitter<SelectedItemInterface>;
    childIndex: number;
    amount: number;
    startPress: number;
    lastX: number;
    onMousedown(e: MouseEvent): void;
    onTouchdown(e: TouchEvent): void;
    onMousemove(e: MouseEvent, maxWidth: number): void;
    onTouchmove(e: TouchEvent, maxWidth: number): void;
    onMouseup(e: MouseEvent, elem: any): void;
    onTouchup(e: TouchEvent, elem: any): void;
    snap(elem: any): number;
    scroll(forward: boolean, elem: any): void;
    calcScroll(elem: any): number;
    ngOnChanges(changes: SimpleChanges): void;
}
