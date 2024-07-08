import { test, expect } from '@playwright/test';
// Importing POM class
import { RegistrationPage } from '../pages/registrationPage';


test.describe('User Registration', () => {

    let registrationPage: RegistrationPage;

  // Open the browser and navigate to the registration page before each test
    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.goto();
    }); // beforeEach end

    // An example of how to register a new user
    test('should register a new user successfully', async ({page}) => {
        await registrationPage.fillUserName(process.env.TEST_USER_NAME || 'JohnTest UserDoe');
        await registrationPage.fillUserEmail(process.env.TEST_USER_EMAIL || 'JohnTestUserDoe@gmail.com');
        await registrationPage.fillUserPassword(process.env.TEST_USER_PASSWORD || 'Password123!');
        await registrationPage.submit();

        await expect(registrationPage.getSuccessMessage()).toContain(' Welcome! You have signed up successfully.');
    }); // test end

    test('should display an error message when the email is invalid', async ({page}) => {
        await registrationPage.fillUserName(process.env.TEST_USER_NAME || 'JohnTest UserDoe');
        await registrationPage.fillUserEmail(process.env.TEST_USER_EMAIL || 'thisemailisinvalid');
        await registrationPage.fillUserPassword(process.env.TEST_USER_PASSWORD || 'Password123!');
        await registrationPage.submit();

        const emailInputValue = await registrationPage.getUserEmail();
        const nameInputValue = await registrationPage.getUserName();
        const currentUrl = page.url();

        await expect(emailInputValue).not.toBe('');
        await expect(nameInputValue).not.toBe('');
        await expect(currentUrl).toBe('https://flask.io/user/sign_up');
    }); // test end

}); // User Registration end