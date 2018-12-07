import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SuperTabComponent } from "./components/super-tab/super-tab";
import { SuperTabsComponent } from "./components/super-tabs/super-tabs";
export var SuperTabsModule = (function () {
    function SuperTabsModule() {
    }
    SuperTabsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SuperTabComponent,
                        SuperTabsComponent
                    ],
                    imports: [
                        IonicModule
                    ],
                    exports: [
                        SuperTabComponent,
                        SuperTabsComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    SuperTabsModule.ctorParameters = function () { return []; };
    return SuperTabsModule;
}());
//# sourceMappingURL=super-tabs.module.js.map