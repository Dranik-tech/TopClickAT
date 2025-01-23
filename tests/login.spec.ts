import {test,expect} from '@playwright/test';
import { credentials } from '../credentials';
import {LoginPage} from '../pages/loginPage';
let loginPage: LoginPage;

test.beforeEach(async ({page, baseURL}) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage(`${baseURL}`);
})

test.afterEach(async ({page}) => {
    await page.close();
})

test.describe("Positive tests", () => {
    test("Login with valid credentials", async ({page}) =>{
        await loginPage.fillPassword(credentials.password);
        await loginPage.fillUserName(credentials.username);
        await loginPage.clickLoginButton();
        await expect(page.getByText("Выйти")).toBeVisible();
    })
});

test.describe("Negative tests",() => {
    test("Login with invalid password",async ({page}) => {
        const responsePromise = page.waitForResponse(response => response.url().endsWith('/login'))

        await loginPage.fillPassword(credentials.invalidPassword);
        await loginPage.fillUserName(credentials.username);
        await loginPage.clickLoginButton();
        const response = await responsePromise;
        await expect(response.status()).toStrictEqual(401);
    })

    test("Login with empty password",async ({page}) => {
        const responsePromise = page.waitForResponse(response => response.url().endsWith('/login'))

        await loginPage.fillPassword(" ");
        await loginPage.fillUserName(credentials.username);
        await loginPage.clickLoginButton();
        const response = await responsePromise;
        await expect(response.status()).toStrictEqual(401);
    })
})