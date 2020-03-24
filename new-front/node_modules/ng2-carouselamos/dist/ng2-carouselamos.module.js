import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2Carouselamos } from './components';
var Ng2CarouselamosModule = (function () {
    function Ng2CarouselamosModule() {
    }
    return Ng2CarouselamosModule;
}());
export { Ng2CarouselamosModule };
Ng2CarouselamosModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    Ng2Carouselamos,
                ],
                exports: [
                    Ng2Carouselamos,
                ]
            },] },
];
/** @nocollapse */
Ng2CarouselamosModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ng2-carouselamos.module.js.map