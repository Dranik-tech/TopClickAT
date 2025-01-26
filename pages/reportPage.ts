import { Locator, Page } from '@playwright/test';

export class ReportPage {
    page:Page;

    constructor(page:Page) {
        this.page = page;
    }

    async checkColorOfTabletop(color:string){
        const colorOfTableTop = this.page.locator(`//td[@class="col-2" and text()="${color}"]`);
        const colorOfTableTopCount = await colorOfTableTop.count();

        return colorOfTableTopCount > 0 ? true : false;
    }

    async checkTypeOfTabletop(type:string){
        const typeOfTableTop = this.page.locator(`//td[@class="col-2" and text()="${type}"]`);
        
        const typeOfTableTopCount = await typeOfTableTop.count();

        return typeOfTableTopCount > 0 ? true : false;
    }

    async checkDrainageСhannelsExisting(drainageСhannels:string){
        const drainageСhannelsLocator = this.page.locator(`//td[@class="col-2" and text()="${drainageСhannels}"]`);
        
        const drainageСhannelsLocatorCount = await drainageСhannelsLocator.count();

        return drainageСhannelsLocatorCount > 0 ? true : false;
    }

    async checkTotalPrice(totalPrice:string) {
        const totalPriceLocator = this.page.locator(`//td[@class="col-2 fw-bold" and text()="${totalPrice}"]`);
        const totalPriceLocatorCount = await totalPriceLocator.count();

        return totalPriceLocatorCount > 0 ? true : false;
    }
}