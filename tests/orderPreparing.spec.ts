import {test,expect,Locator} from '@playwright/test';
import { credentials } from '../credentials';
import {LoginPage} from '../pages/loginPage';
import {OrderPreparing} from '../pages/orderPreparing';
import {ReportPage} from '../pages/reportPage';
import * as allure from "allure-js-commons";

let loginPage: LoginPage;
let orderPreparingPage: OrderPreparing;

test.beforeEach(async ({page, baseURL}) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage(`${baseURL}`);
    await loginPage.fillPassword(credentials.password);
    await loginPage.fillUserName(credentials.username);
    await loginPage.clickLoginButton();
    orderPreparingPage = new OrderPreparing(page);
})

test.afterEach(async ({context}) => {
    await context.close();
})

test.describe("Positive tests for order preparing", () => {

    test("Hide a tabletop", async () => {
        await allure.parentSuite("Positive tests for order preparing");
        await allure.suite("Hide a tabletop");
        await expect(orderPreparingPage.thickness).toBeVisible();
        await orderPreparingPage.clickHidingToggle();
        await expect(orderPreparingPage.thickness).toBeHidden();
    })

    test("Switch to a u-shaped tabletop", async () => {
        await allure.parentSuite("Positive tests for order preparing");
        await allure.suite("Switch to a u-shaped tabletop");
        const startPlinthCount:number= await orderPreparingPage.getPlinthHemContainerCount();
        await orderPreparingPage.switchToUShapedButton();
        const endPlinthCount:number = await orderPreparingPage.getPlinthHemContainerCount();

        expect(orderPreparingPage.calculationTabHeader.first()).toContainText("П-образная столешница");
        expect(startPlinthCount).toBeLessThan(endPlinthCount);
    })

    test("Preparing an order",async ({context}) => {
        await allure.parentSuite("Positive tests for order preparing");
        await allure.suite("Preparing an order");
        await orderPreparingPage.switchToUShapedButton();
        await orderPreparingPage.selectThickness(4);
        await orderPreparingPage.togglePlinth();
        await orderPreparingPage.toggleKitchenIsland();
        await orderPreparingPage.toggleDrainageСhannels();
        await orderPreparingPage.selectTabletopColor("N-103 Gray Onix");
        await orderPreparingPage.clickCalculationButton();

        const [newPage] = await Promise.all([  
            context.waitForEvent('page'),   
            orderPreparingPage.openReportButton.click(),
        ]);  

        await newPage.waitForLoadState();  

        let reportPage = new ReportPage(newPage);
    
       expect(await reportPage.checkColorOfTabletop('acryl:Neomarm:N-103 Gray Onix')).toBeTruthy(); 
       expect(await reportPage.checkTypeOfTabletop('П-образная')).toBeTruthy();
       expect(await reportPage.checkDrainageСhannelsExisting('Проточки для стока воды')).toBeTruthy();
       expect(await reportPage.checkTotalPrice('498800.00 ₽')).toBeTruthy();
       
    })
})

test.describe("Additional tests (outside the final task)", () => {
    test("Enter length of tabletop", async ({}) => {
        await allure.parentSuite("Additional tests");
        await allure.suite("Enter length of tabletop");
        await orderPreparingPage.enterTabletopLength("1000");
        expect(orderPreparingPage.tabletopParametersOnCalculationTab).toContainText("1000см х");
    })

    test("Add second tabletop",async () => {
        await allure.parentSuite("Additional tests");
        await allure.suite("Add second tabletop");
        await orderPreparingPage.clickSecondTabletopButton();
        expect(orderPreparingPage.removeSecondTabletopButton).toBeVisible();
    })

    test("Remove second tabletop", async () => {
        await allure.parentSuite("Additional tests");
        await allure.suite("Remove second tabletop");
        await orderPreparingPage.clickSecondTabletopButton();
        await orderPreparingPage.removeSecondTabletop();
        expect(orderPreparingPage.removeSecondTabletopButton).toBeHidden();
    })

    test ("Open commercial offer popup", async () => {
        await allure.parentSuite("Additional tests");
        await allure.suite("Open commercial offer popup");
        await orderPreparingPage.togglePlinth();
        await orderPreparingPage.selectThickness(4);
        await orderPreparingPage.clickCalculationButton();
        await orderPreparingPage.clickOnCommercialOfferButton();
        expect(orderPreparingPage.commercialOfferPopupHeader).toBeVisible();
    })

    test("Go to login page", async () => {
        await allure.parentSuite("Additional tests");
        await allure.suite("Go to login page");
        await orderPreparingPage.exitFromPage();
        expect(loginPage.userField).toBeVisible();
        expect(loginPage.passwordField).toBeVisible();
    })
})