import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'
import { AdminPage } from '../pages/admin'

test.describe.configure({ mode: 'serial' });

const username_admin = 'Timothy'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const username_full = username_admin.concat(randomNumber)

var search = ' '
var searchname = search.concat(username_full)
var searchname_full = searchname.concat(' ESS')

test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Admin = new AdminPage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Admin.gotoAdminPage()

});

test('Add new employee', async ({ page }) => {

    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Timothy');
    await page.getByPlaceholder('Middle Name').click();
    await page.getByPlaceholder('Middle Name').fill('Lewis');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Amiano');
    await page.locator('form').getByRole('textbox').nth(4).click()
    await page.locator('form').getByRole('textbox').nth(4).fill(randomNumber);
    await page.getByRole('button', { name: 'Save' }).click();

})


test('Add new admin user', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    await page.getByRole('button', { name: ' Add' }).click();
    await expect(page.getByRole('heading', { name: 'Add User' })).toBeVisible()
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: 'ESS' }).click();
    await page.locator('form i').nth(1).click();
    await page.getByRole('option', { name: 'Enabled' }).click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill('Timothy Lewis Amiano');
    await page.getByText('Timothy Lewis Amiano').first().click();
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill(username_full);
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill('password123');
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill('password123');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(username_full, { exact: true })).toBeVisible()

});

test('Edit existing admin user', async ({ page }) => {

    await page.getByRole('row', { name: searchname_full }).getByRole('button').nth(1).click();
    await page.locator('form i').first().click();
    await page.locator('form i').first().click();
    await page.locator('form i').nth(1).click();
    await page.getByRole('option', { name: 'Disabled' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

})

test('Delete admin user', async ({ page }) => {

    await page.getByRole('row', { name: searchname_full }).getByRole('button').first().click();
    await page.getByRole('button', { name: ' Yes, Delete' }).click();
    await expect (page.getByText(username_full)).not.toBeVisible();

})
