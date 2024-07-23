import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import demoUserInfo from '../../resources/demo-user.json';
import { User } from '../../types/user';
import { Board } from '../../types/board';

test.describe('User Login', () => {
    let loginPage: LoginPage;
    let user: User | undefined;
    let demo_board: Board | undefined;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        
        demo_board = demoUserInfo.demo_boards.find(b => b.board_name === 'demo_board');
        user = demoUserInfo.user_accounts.find(u => u.id === 'test_user');

        if (!user || !demo_board ) {
            throw new Error(`Issue configuring the data from demo-config.json:\nuser = ${user}\nboard = ${demo_board}`);
        }
    
        await page.context().clearCookies();
        await page.goto('https://trello.com');
    });



    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.evaluate(() => localStorage.clear());
    });

    

    test('should login and navigate to the board successfully', async ({ page }) => {
        await loginPage.clickLoginButton();
        await loginPage.fillUserEmail(user!.email);
        await loginPage.clickContinueButton();
        await page.locator(loginPage.userPasswordInputSelector).waitFor({ state: 'visible' });
        await loginPage.fillUserPassword(user!.password);
        await page.locator(loginPage.submitButtonSelector).waitFor({ state: 'visible' });
        await loginPage.clickSubmitButton();
        await loginPage.waitForLoginDashboardBoardsList();
        await loginPage.navigateToBoard(demo_board!.board_url);
        const boardName = await loginPage.getBoardName();
        expect(boardName).toBe('Demo-Board');
    });
});
