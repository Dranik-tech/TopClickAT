import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private page:Page;
    private passwordField:Locator;
    private userField:Locator;
    private loginButton:Locator;

    constructor(page:Page){
        this.page = page;
        //Locators
        this.passwordField = this.page.getByPlaceholder('пароль');
        this.userField = this.page.getByPlaceholder('логин');
        this.loginButton = this.page.locator('//button[text()="Войти"]');
    }

    async openLoginPage(url:string){
        await this.page.goto(url);
    }
    
    async fillPassword(password){
        await this.passwordField.fill(password);
    }

    async fillUserName(userName){
        await this.userField.fill(userName);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }
}