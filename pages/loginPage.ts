import { Locator, Page } from '@playwright/test';
import * as allure from "allure-js-commons";

export class LoginPage {
     page:Page;
     passwordField:Locator;
     userField:Locator;
     loginButton:Locator;

    constructor(page:Page){
        this.page = page;
        //Locators
        this.passwordField = this.page.getByPlaceholder('пароль');
        this.userField = this.page.getByPlaceholder('логин');
        this.loginButton = this.page.locator('//button[text()="Войти"]');
    }

    async openLoginPage(url:string){
        await allure.step("Open login page", async () => {
            await this.page.goto(url);
        })
    }
    
    async fillPassword(password){
        await allure.step("Enter a password", async () => {
            await this.passwordField.fill(password);
        })
    }

    async fillUserName(userName){
        await allure.step("Enter a user name", async () => {
            await this.userField.fill(userName);
        })
    }

    async clickLoginButton(){
        await allure.step("Click Login button", async () => {
            await this.loginButton.click();
        })
    }
}