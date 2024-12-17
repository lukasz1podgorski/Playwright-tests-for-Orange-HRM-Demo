import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'
import { DirectoryPage } from '../pages/directory'

test.describe.configure({ mode: 'serial' });

const employeeName = 'Adam'
const searchName = ' Thomas Smith'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const employeeName_full = employeeName.concat(randomNumber)
const searchName_full = employeeName_full.concat(searchName)


test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Performance = new DirectoryPage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Performance.gotoDirectoryPage()

});

test('Add new employee', async ({ page }) => {

    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill(employeeName_full);
    await page.getByPlaceholder('Middle Name').click();
    await page.getByPlaceholder('Middle Name').fill('Thomas');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Smith');
    await page.locator('form').getByRole('textbox').nth(4).click();
    await page.locator('form').getByRole('textbox').nth(4).fill(randomNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

})

test('Search in directory', async ({ page }) => {

    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill(employeeName_full);
    await page.getByRole('option', { name: searchName_full }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByText(searchName_full).click();
    await expect(page.getByText(searchName_full).nth(1)).toBeVisible();

})