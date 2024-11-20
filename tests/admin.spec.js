import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'
import { AdminPage } from '../pages/admin'

test.describe.configure({ mode: 'serial' });

const username_admin = 'Timothy'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}
const randomNumber = random()

const result = username_admin.concat(randomNumber)

test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Admin = new AdminPage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin','admin123')
    await Admin.gotoAdminPage()
    
});

test('Add new employee', async ({page}) => {

    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Timothy');
    await page.getByPlaceholder('Middle Name').click();
    await page.getByPlaceholder('Middle Name').fill('Lewis');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Amiano');
    // var timestamp = Date.now().toString()
    await page.locator('form').getByRole('textbox').nth(4).click()
    await page.locator('form').getByRole('textbox').nth(4).fill(randomNumber);
    await page.getByRole('button', { name: 'Save' }).click();

})


test('Add new admin user', async ({page}) => {

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
    // var username_admin = 'Timothy'
    // var timestamp = Date.now().toString()
    // var result = username_admin.concat(timestamp);
    await page.getByRole('textbox').nth(2).fill(result);
    console.log(result)
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill('password123');
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill('password123');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(result, { exact: true })).toBeVisible()

});

test('Edit existing admin user', async ({page}) => {

    var search = ' '
    var searchName = search.concat(result)
    var full = searchName.concat(' ESS')
    console.log(full)
    
    await page.getByRole('row', { name: full }).getByRole('button').nth(1).click();

    await page.locator('form i').first().click();
    await page.locator('form i').first().click();
    await page.locator('form i').nth(1).click();
    await page.getByRole('option', { name: 'Disabled' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

})