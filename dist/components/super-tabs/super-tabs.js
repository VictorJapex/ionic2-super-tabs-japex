import { Component, ContentChildren, Input, ViewChild } from '@angular/core';
import { SuperTabComponent } from "../super-tab/super-tab";
import { Header, Platform, Slides, Events } from "ionic-angular";
import * as $ from 'jquery';
/*
  Generated class for the SuperTabs component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
export var SuperTabsComponent = (function () {
    function SuperTabsComponent(platform, events) {
        this.platform = platform;
        this.events = events;
        this.tabs = [];
        this.headerHeight = 0;
        this.slidesHeight = 0;
        this._selectedTabIndex = 0;
        this.slidePosition = '0';
        this.slideWidth = '0';
        this.shouldSlideEase = false;
        this.pageTitle = '';
        console.log('Hello JapexSuperTabs Component');
    }
    Object.defineProperty(SuperTabsComponent.prototype, "selectedTabIndex", {
        get: function () {
            return this._selectedTabIndex;
        },
        set: function (val) {
            this._selectedTabIndex = val;
            if (val > -1 && val < this.tabs.length) {
                var slidePosition = val * this.slides.renderedWidth / this.tabs.length;
                this.slidePosition = slidePosition <= this.maxSlidePosition ? slidePosition + 'px' : this.maxSlidePosition + 'px';
                this.pageTitle = this.tabs[this.selectedTabIndex].title;
                this.slides.slideTo(val);
                var self_1 = this;
                clearTimeout(this.timerScrollTab);
                this.timerScrollTab = setTimeout(function () {
                    self_1.scrollTabView();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     * // TODO figure out a way to reset the "slide" position after the user is done dragging. ATM it gets stuck if the user swipes partially without changing the tab.
     * @param ev
     */
    SuperTabsComponent.prototype.onDrag = function (ev) {
        if (ev._translate > 0)
            return;
        var percentage = Math.abs(ev._translate / ev._virtualSize);
        var singleSlideSize = ev._renderedSize;
        var slidePosition = percentage * singleSlideSize;
        if (slidePosition > this.maxSlidePosition) {
            slidePosition = this.maxSlidePosition;
        }
        this.slidePosition = slidePosition + 'px';
    };
    /**
     * The slide will change because the user stopped dragging, or clicked on a segment button
     * Let's make sure the segment button is in alignment with the slides
     * Also, lets animate the "slide" element
     */
    SuperTabsComponent.prototype.onSlideWillChange = function () {
        if (this.slides.getActiveIndex() < this.tabs.length) {
            this.shouldSlideEase = true;
            this.selectedTabIndex = this.slides.getActiveIndex();
            this.events.publish('tabChanged', this.slides.getActiveIndex());
            if (this.tabChanged)
                this.tabChanged(this.slides.getActiveIndex());
        }
    };
    /**
     * We need to disable animation after the slide is done changing
     * Any further movement should happen instantly as the user swipes through the tabs
     */
    SuperTabsComponent.prototype.onSlideDidChange = function () {
        this.shouldSlideEase = false;
        var self = this;
        clearTimeout(this.timerScrollTab);
        this.timerScrollTab = setTimeout(function () {
            self.scrollTabView();
        }, 500);
    };
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    SuperTabsComponent.prototype.onTabSelect = function (index) {
        if (index <= this.tabs.length) {
            this.slides.slideTo(index);
        }
    };

    /**
     * Animate scroll tab navigation
     */
    SuperTabsComponent.prototype.scrollTabView = function () {
        var self = this;
        var elem = self.segment.nativeElement.scrollLeft;
        var posOriginal = self.segment.nativeElement.children[self.selectedTabIndex].offsetLeft - 40;
        $(self.segment.nativeElement).animate({
            scrollLeft: posOriginal
        }, elem > posOriginal ? (elem - posOriginal) * 4 : (posOriginal - elem) * 4);
    };
    SuperTabsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // take the tabs from the query and put them in a regular array to make life easier
        this.superTabs.forEach(function (tab) { return _this.tabs.push(tab); });
        // set page title based on the selected page
        this.pageTitle = this.tabs[this.selectedTabIndex].title;
        // the width of the "slide", should be equal to the width of a single `ion-segment-button`
        // we'll just calculate it instead of querying for a segment button
        this.slideWidth = this.platform.width() / this.tabs.length + 'px';
        // we need this to make sure the "slide" thingy doesn't move outside the screen
        this.maxSlidePosition = this.platform.width() - (this.platform.width() / this.tabs.length);
        // we waiting for 100ms just to give `ion-icon` some time to decide if they want to show up or not
        // if we check height immediately, we will get the height of the header without the icons
        setTimeout(this.setHeights.bind(this), 100);
    };
    /**
     * Sets the height of ion-slides and it's position from the top of the page
     */
    SuperTabsComponent.prototype.setHeights = function () {
        this.headerHeight = this.header.getNativeElement().offsetHeight;
        this.slidesHeight = this.platform.height() - this.headerHeight;
    };
    SuperTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'super-tabs',
                    template: "\n      <ion-header class=\"super-tabs\">\n          <ion-navbar hideBackButton=\"true\">\n              <ion-title>{{pageTitle}}</ion-title>\n              <ng-content></ng-content>\n          </ion-navbar>\n          <ion-toolbar>\n              <ion-segment #segment [(ngModel)]=\"selectedTabIndex\">\n                  <ion-segment-button *ngFor=\"let tab of tabs; let i = index\" [value]=\"i\" [id]=\"onSetIndex(tab,i)\" (ionSelect)=\"onTabSelect(i)\">\n                      <ion-icon *ngIf=\"tab.icon\" [name]=\"tab.icon\"></ion-icon>\n                      {{tab.title}}\n                  </ion-segment-button>\n              </ion-segment>\n              <div class=\"slide\" #slide [style.left]=\"slidePosition\" [class.ease]=\"shouldSlideEase\" [style.width]=\"slideWidth\"></div>\n          </ion-toolbar>\n      </ion-header>\n      <ion-slides class=\"super-tabs\" [style.margin-top]=\"headerHeight + 'px'\" [style.height]=\"slidesHeight + 'px'\" (ionSlideDrag)=\"onDrag($event)\" (ionSlideWillChange)=\"onSlideWillChange()\" (ionSlideDidChange)=\"onSlideDidChange()\" [initialSlide]=\"selectedTabIndex\">\n          <ion-slide *ngFor=\"let tab of tabs\">\n              <ion-nav [root]=\"tab.tabRoot\"></ion-nav>\n          </ion-slide>\n      </ion-slides>\n  "
                },] },
    ];
    /** @nocollapse */
    SuperTabsComponent.ctorParameters = function () { return [
        { type: Platform, },
        { type: Events, },
    ]; };
    SuperTabsComponent.propDecorators = {
        'superTabs': [{ type: ContentChildren, args: [SuperTabComponent,] },],
        'slides': [{ type: ViewChild, args: [Slides,] },],
        'segment': [{ type: ViewChild, args: ['segment',] },],
        'header': [{ type: ViewChild, args: [Header,] },],
        'tabChanged': [{ type: Input },],
        'selectedTabIndex': [{ type: Input },],
    };
    return SuperTabsComponent;
}());
//# sourceMappingURL=super-tabs.js.map