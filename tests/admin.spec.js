import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'
import { AdminPage } from '../pages/admin'

test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Admin = new AdminPage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin','admin123')
    await Admin.gotoAdminPage()
    
});

test('Add new admin user', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    await page.getByRole('button', { name: ' Add' }).click();
    await expect(page.getByRole('heading', { name: 'Add User' })).toBeVisible()
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: 'ESS' }).click();
    await page.locator('form i').nth(1).click();
    await page.getByRole('option', { name: 'Enabled' }).click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill('a');
    await page.getByText('Timothy Lewis Amiano').click();
    await page.getByRole('textbox').nth(2).click();
    var username_admin = 'Timothy'
    var timestamp = Date.now().toString()
    var result = username_admin.concat(timestamp);
    await page.getByRole('textbox').nth(2).fill(result);
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill('password123');
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill('password123');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(result, { exact: true })).toBeVisible()

});

