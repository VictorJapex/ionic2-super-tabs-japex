import { QueryList, ElementRef } from '@angular/core';
import { SuperTabComponent } from "../super-tab/super-tab";
import { Header, Platform, Slides, Events } from "ionic-angular";
export declare class SuperTabsComponent {
    private platform;
    private events;
    private timerScrollTab;
    superTabs: QueryList<SuperTabComponent>;
    tabs: SuperTabComponent[];
    slides: Slides;
    segment: ElementRef;
    header: Header;
    headerHeight: number;
    slidesHeight: number;
    tabChanged: Function;
    _selectedTabIndex: number;
    selectedTabIndex: number;
    maxSlidePosition: number;
    slidePosition: string;
    slideWidth: string;
    shouldSlideEase: boolean;
    pageTitle: string;
    constructor(platform: Platform, events: Events);
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     * // TODO figure out a way to reset the "slide" position after the user is done dragging. ATM it gets stuck if the user swipes partially without changing the tab.
     * @param ev
     */
    onDrag(ev: Slides): void;
    /**
     * The slide will change because the user stopped dragging, or clicked on a segment button
     * Let's make sure the segment button is in alignment with the slides
     * Also, lets animate the "slide" element
     */
    onSlideWillChange(): void;
    /**
     * We need to disable animation after the slide is done changing
     * Any further movement should happen instantly as the user swipes through the tabs
     */
    onSlideDidChange(): void;
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    onTabSelect(index: number): void;
    /**
     * Animate scroll tab navigation
     */
    scrollTabView(): void;
    ngAfterViewInit(): void;
    /**
     * Sets the height of ion-slides and it's position from the top of the page
     */
    private setHeights();
}
