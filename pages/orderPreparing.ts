import { Locator, Page } from '@playwright/test';
import * as allure from "allure-js-commons";

export class OrderPreparing {
    page:Page;
    exitButton:Locator;
    tabletopHidingToggle:Locator;
    thickness:Locator;
    uShapedTableTopButton:Locator;
    plinthHemContainer:Locator;
    calculationTabHeader:Locator;
    thicknessDropdown:Locator;
    plinthEnablingToggle:Locator;
    kitchenIslandToggle:Locator;
    drainageСhannelsToggle:Locator;
    calculationButton:Locator;
    openReportButton:Locator;
    changeTabletopSize:Locator;
    tabletopParametersOnCalculationTab: Locator;
    addSecondTableTopButton:Locator;
    removeSecondTabletopButton:Locator;
    commercialOfferButton:Locator;
    commercialOfferPopupHeader:Locator;

    constructor(page:Page){
        this.page = page;
        this.exitButton = this.page.getByText("Выйти");
        this.tabletopHidingToggle = this.page.locator('//div[@data-testid="hide-countertop"]//img');
        this.thickness = this.page.locator('//label[text()="Толщина"]');
        this.uShapedTableTopButton = this.page.getByTestId('countertop-type-u');
        this.plinthHemContainer = this.page.getByTestId('edge-or-plinth');
        this.calculationTabHeader = this.page.locator('//div[@data-testid="order-list"]//h4');
        this.thicknessDropdown = this.page.locator('//div[@data-testid="select-thickness"]//label[text()="Толщина"]/following-sibling::button');
        this.plinthEnablingToggle = this.page.locator('//div[text()="Плинтус"]');
        this.kitchenIslandToggle = this.page.locator('//h4[text()="Остров"]');
        this.drainageСhannelsToggle = this.page.locator('//h4[text()="Проточки для стока воды"]');
        this.calculationButton = this.page.getByTestId('calc-button');
        this.openReportButton = this.page.getByTestId("open-report-button");
        this.changeTabletopSize = this.page.locator('//div[@data-testid="size-control"]//input').first();
        this.tabletopParametersOnCalculationTab = this.page.locator('//div[@data-testid="order-list"]//ul//li').first();
        this.addSecondTableTopButton = this.page.getByTestId('button-plus-blue');
        this.removeSecondTabletopButton = this.page.getByTestId('button-plus-red');
        this.commercialOfferButton = this.page.getByTestId('create-order-button');
        this.commercialOfferPopupHeader = this.page.locator('//h1[text()="Создать КП"]');
    }

    async exitFromPage(){
        await allure.step("Exit from the app to the login page", async () =>{
            await this.exitButton.waitFor();
            await this.exitButton.click();
        })  
    }

    async clickHidingToggle(){
        await allure.step("Hide a tabletop", async () => {
            await this.tabletopHidingToggle.waitFor();
            await this.tabletopHidingToggle.click();
        }) 
    }

    async switchToUShapedButton() {
        await allure.step("Switch a tabletop to U-shaped option", async () => {
            await this.uShapedTableTopButton.waitFor();
            await this.uShapedTableTopButton.click();
        })
    }

    async getPlinthHemContainerCount() {
        await allure.step("Get count of Plinth/Hem toggles on a tabletop", async () => {
            await this.uShapedTableTopButton.waitFor();
        })

        return await this.plinthHemContainer.count();
    }

    async openThicknessDropdown() {
        await allure.step("Open thickness dropdown on a tabletop", async () => {
            await this.uShapedTableTopButton.waitFor();
            await this.thicknessDropdown.click();
        })
    }

    async selectThickness(thickness:number) {
        await allure.step("Select Thickness of a tabletop", async () => {
            const selectedThickness = this.page.locator(`//div[@data-testid="select-thickness"]//span[text()="${thickness}"]`);
            await this.openThicknessDropdown();
            await selectedThickness.waitFor();
            await selectedThickness.click();
        })
    }

    async togglePlinth() {
        await allure.step("Add/Remove a plinth on a tabletop", async () => {
            await this.plinthEnablingToggle.waitFor();
            await this.plinthEnablingToggle.click();
        })
    }

    async toggleKitchenIsland() {
        await allure.step("Add/Remove a kitchen island", async () => {
            await this.kitchenIslandToggle.waitFor();
            await this.kitchenIslandToggle.click();
        })
    }

    async toggleDrainageСhannels() {
        await allure.step("Add/Remove drainage channels", async () => {
            await this.drainageСhannelsToggle.waitFor();
            await this.drainageСhannelsToggle.click();
        })
    }

    async clickCalculationButton() {
        await allure.step("Click calculation button", async () => {
            await this.calculationButton.waitFor();
            await this.calculationButton.click();
        })
    }

    async selectTabletopColor(color:string) {
        await allure.step("Select color for tabletop",async () => {
            const selectedColor = this.page.locator(`//div[@class="stoneName" and text()="${color}"]`);
            await selectedColor.waitFor();
            await selectedColor.click();
        })
    }

    async focusOnTableTopLengthField(){
        await this.changeTabletopSize.waitFor();
        await this.changeTabletopSize.click();
    }

    async enterTabletopLength(length:string){
        await this.focusOnTableTopLengthField();
        await this.changeTabletopSize.fill(length);
        await this.changeTabletopSize.press('Enter');
    }

    async clickSecondTabletopButton() {
        await this.addSecondTableTopButton.waitFor();
        await this.addSecondTableTopButton.click();
    }

    async removeSecondTabletop() {
        await this.removeSecondTabletopButton.waitFor();
        await this.removeSecondTabletopButton.click();
    }

    async clickOnCommercialOfferButton() {
        await this.commercialOfferButton.waitFor();
        await this.commercialOfferButton.click();
    }
}

