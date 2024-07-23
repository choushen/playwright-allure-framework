import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginButtonSelector: string = 'a[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]';
    readonly userEmailInputSelector: string = '#username';
    readonly userPasswordInputSelector: string = '#password';
    readonly submitButtonSelector: string = '#login-submit';
    readonly boardNameSelector: string = 'h1[data-testid="board-name-display"]';
    readonly continueButtonSelector: string = '#login-submit';
    readonly loginDashboardBoardsListSelector: string = 'ul.boards-page-board-section-list'; // Updated selector

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async clickLoginButton(): Promise<void> {
        await this.page.click(this.loginButtonSelector);
    }

    async fillUserEmail(userEmail: string): Promise<void> {
        await this.page.fill(this.userEmailInputSelector, userEmail);
    }

    async clickContinueButton(): Promise<void> {
        await this.page.click(this.continueButtonSelector);
    }

    async fillUserPassword(userPassword: string): Promise<void> {
        await this.page.fill(this.userPasswordInputSelector, userPassword);
    }

    async clickSubmitButton(): Promise<void> {
        await this.page.click(this.submitButtonSelector);
    }

    async navigateToBoard(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForLoginDashboardBoardsList(): Promise<void> {
        const boardListLocator: Locator = this.page.locator(this.loginDashboardBoardsListSelector);
        await boardListLocator.waitFor({ state: 'visible', timeout: 5000 });
    }

    async getBoardName(): Promise<string | null> {
        const boardNameLocator: Locator = this.page.locator(this.boardNameSelector);
        await boardNameLocator.waitFor({ state: 'visible', timeout: 5000 });
        return await boardNameLocator.textContent();
    }


}
