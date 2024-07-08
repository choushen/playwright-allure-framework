import { test, expect } from '@playwright/test';

// Assuming a Page Object Model structure
import { RegistrationPage } from '../pages/registrationPage';

test.describe('User Registration', () => {

  let registrationPage: RegistrationPage;

  // Open the browser and navigate to the registration page before each test
  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  }); // beforeEach end

  test('should register a new user successfully', async () => {
    await registrationPage.fillUserName(process.env.TEST_USER_NAME || 'JohnTest UserDoe');
    await registrationPage.fillUserEmail(process.env.TEST_USER_EMAIL || 'JohnTestUserDoe@gmail.com');
    await registrationPage.fillUserPassword(process.env.TEST_USER_PASSWORD || 'Password123!');
    await registrationPage.submit();

    await expect(registrationPage.getSuccessMessage()).toContain(' Welcome! You have signed up successfully.');
  }); // test end

}); // describe end