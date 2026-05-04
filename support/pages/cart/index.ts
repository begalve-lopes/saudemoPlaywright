import { expect, Locator, Page } from "@playwright/test"
import { Login } from "../../fixtures/login.interface";

export class CartPage {
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

  async selectionCart() {
    const carName = this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: 'Sauce Labs Backpack' });

    await expect(carName).toBeVisible();
  }

  async adicionarNoCart() {
    const buttonCart = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await buttonCart.click()

  }

  async validarBadge(expectedCount: number) {
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText(String(expectedCount));

    const carBadgeButton = this.page.locator('[data-test="shopping-cart-link"]')
    await carBadgeButton.click()

  }

  async removeValidadecart() {
    const removeBackpackButton = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    await removeBackpackButton.click();
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  }


}
