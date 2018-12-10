import { Component, Input } from '@angular/core';
export var SuperTabComponent = (function () {
    function SuperTabComponent() {
        console.log('Hello JapexSuperTab Component');
    }
    SuperTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'super-tab',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SuperTabComponent.ctorParameters = function () { return []; };
    SuperTabComponent.propDecorators = {
        'tabRoot': [{ type: Input },],
        'title': [{ type: Input },],
        'id': [{ type: Input },],
        'icon': [{ type: Input },],
    };
    return SuperTabComponent;
}());
//# sourceMappingURL=super-tab.js.map