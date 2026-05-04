import { test } from '@playwright/test';
import { Login } from '../support/fixtures/login.interface';
import { LoginPage } from '../support/pages/login';
import data from '../support/fixtures/login.json';


test.describe('Login tetts', () => {


  test('Login Válido', async ({ page }) => {
    const login = data.validLogin as Login

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.go()
    await loginPage.form(login)
    await loginPage.submit()
    await loginPage.shouldHaveTitle('Products')

  })


  test('Login vazio', async ({ page }) => {
    const login = data.emptyBoth as Login

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.go()
    await loginPage.form(login)
    await loginPage.submit()
    await loginPage.shouldHaveError('Epic sadface: Username is required')

  })

  test('Login sem a password', async ({ page }) => {
    const login = data.emptyPassword as Login

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.go()
    await loginPage.form(login)
    await loginPage.submit()
    await loginPage.shouldHaveError('Epic sadface: Password is required')

  })

  test('Login sem o usuario', async ({ page }) => {
    const login = data.emptyUsername as Login

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.go()
    await loginPage.form(login)
    await loginPage.submit()
    await loginPage.shouldHaveError('Epic sadface: Username is required')

  })

  test('Login com dados errados', async ({ page }) => {
    const login = data.invalidCredentials as Login

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.go()
    await loginPage.form(login)
    await loginPage.submit()
    await loginPage.shouldHaveError('Epic sadface: Username and password do not match any user in this service')

  })

  test('Login com username certo e password errado', async ({ page }) => {
    const login = data.validUserInvalidPassword as Login

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.go()
    await loginPage.form(login)
    await loginPage.submit()
    await loginPage.shouldHaveError('Epic sadface: Username and password do not match any user in this service')

  })

  test('Login com password certo e username errado', async ({ page }) => {
    const login = data.invalidUsernameValidPassword as Login

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.go()
    await loginPage.form(login)
    await loginPage.submit()
    await loginPage.shouldHaveError('Epic sadface: Username and password do not match any user in this service')

  })

})
