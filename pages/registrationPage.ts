import { Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly userNameInputSelector = '#user_name';
  readonly userEmailInputSelector = '#user_email';
  readonly userPasswordInputSelector = '#user_password';
  readonly submitButtonSelector = '//input[type="submit"]';
  readonly successMessageSelector = "//div[@id='notice' and contains(.,' Welcome! You have signed up successfully.')]";


  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://flask.io/user/sign_up');
  }

  async fillUserName(userName: string) {
    await this.page.fill(this.userNameInputSelector, userName);
  }

  async fillUserEmail(userEmail: string) {
    await this.page.fill(this.userEmailInputSelector, userEmail);
  }

  async fillUserPassword(userPassword: string) {
    await this.page.fill(this.userPasswordInputSelector, userPassword);
  }

  async submit() {
    await this.page.locator(this.submitButtonSelector).click();
  }

  async getSuccessMessage() {
    return await this.page.locator(this.successMessageSelector).textContent();
  }

} // RegistrationPage end