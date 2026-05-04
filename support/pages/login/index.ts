import { expect, Locator, Page } from "@playwright/test"
import { Login } from "../../fixtures/login.interface";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async go() {
    await this.page.goto('https://www.saucedemo.com/');

  }
  async form(login: Login) {
    const inputUsername = this.page.locator('[data-test="username"]')
    await inputUsername.fill(login.Username)

    const inputPassword = this.page.locator('[data-test="password"]')
    await inputPassword.fill(login.Password)

  }

  async submit() {
    const buttonLogin = this.page.locator('[data-test="login-button"]');
    await buttonLogin.click()
  }

  async shouldHaveTitle(textValided: string) {
    const target = this.page.locator('[data-test="title"]');
    await expect(target).toHaveText(textValided);
  }

  async shouldHaveError(messagem: string) {
    const target = this.page.locator('[data-test="error"]');

    await expect(target).toBeVisible();
    await expect(target).toHaveText(messagem);
  }
}
