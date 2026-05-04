import { test } from '@playwright/test'
import { CartPage } from '../support/pages/cart';
import { Login } from '../support/fixtures/login.interface';
import data from '../support/fixtures/login.json';


test.describe('Testes para carrinho', () => {

  test.beforeEach(async ({ page }) => {
    const cartPage: CartPage = new CartPage(page);
    const login = data.validLogin as Login;

    await cartPage.go();
    await cartPage.form(login);
    await cartPage.submit();
    await cartPage.shouldHaveTitle('Products');
  });

  test('Login com sucesso', async ({ page }) => {
    const cartPage: CartPage = new CartPage(page);

    await cartPage.selectionCart();
    await cartPage.adicionarNoCart();
    await cartPage.validarBadge(1);

    await cartPage.shouldHaveTitle('Your Cart');

    await cartPage.removeValidadecart();
  });

});


