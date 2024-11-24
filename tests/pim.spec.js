import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'
import { PIMPage } from '../pages/pim'

test.describe.configure({ mode: 'serial' });

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const PIM = new PIMPage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await PIM.gotoPIMPage()

});

test('Add new employee', async ({ page }) => {

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
    await expect (page.getByRole('heading', { name: 'Timothy Amiano' })).toBeVisible();

})

test('Edit existing employee', async ({ page }) => {

    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill(randomNumber);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect (page.getByText(randomNumber)).toBeVisible()
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByRole('textbox').first().click();
    await page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByRole('textbox').first().fill('11223344');
    await page.locator('div').filter({ hasText: /^Date of BirthGenderMaleFemale$/ }).locator('i').click();
    await page.getByText('Today').click();
    await page.locator('label').filter({ hasText: /^Male$/ }).locator('span').click();
    await page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button').click();
    await expect (page.getByText('Male', { exact: true })).toBeVisible();

})

test('Delete employee record', async ({ page }) => {

    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill(randomNumber);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: ' Yes, Delete' }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await expect (page.getByText('Success', { exact: true })).toBeVisible();

})