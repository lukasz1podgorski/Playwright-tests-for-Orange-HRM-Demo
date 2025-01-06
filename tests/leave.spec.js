import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { PIMPage } from '../pages/pim'
import { LeavePage } from '../pages/leave'

test.describe.configure({ mode: 'serial' });

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()


test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Leave = new LeavePage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Leave.gotoLeavePage()

});

test('Apply for leave', async ({ page }) => {

    await page.getByRole('link', { name: 'Apply' }).click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: 'CAN - FMLA' }).click();
    await page.locator('form i').nth(2).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByText('10').click();
    await page.locator('form i').nth(3).click();
    await page.getByText('12').click();
    await page.locator('form i').nth(4).click();
    await page.getByRole('option', { name: 'All Days' }).click();
    await page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
    await page.getByRole('option', { name: 'Specify Time' }).click();
    await page.locator('textarea').click();
    await page.locator('textarea').fill('Vacation');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect.soft(page.getByText('Warning')).toBeVisible();
    // soft assertion due to warning being thrown in case user already applied for leave,
    // if the records on demo site are purged, the assertion would be "Success" pop-up instead

})

test('Add entitlements', async ({ page }) => {

    const PIM = new PIMPage(page)
    const Leave = new LeavePage(page)

    await PIM.gotoPIMPage()
    await PIM.addNewEmployee(randomNumber, 'Lewis', 'Amiano', randomNumber)
    await Leave.gotoLeavePage()


    await page.getByText('Entitlements').click();
    await page.getByRole('menuitem', { name: 'Add Entitlements' }).click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill(randomNumber);
    await page.getByRole('option', { name: 'Lewis Amiano' }).click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: 'CAN - Vacation' }).click();
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill('300');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible()

})

test('Assign leave', async ({ page }) => {


    await page.locator('li').filter({ hasText: 'Assign Leave' }).click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill(randomNumber);
    await page.getByRole('option', { name: 'Lewis Amiano' }).click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: 'CAN - Vacation' }).click();
    await page.locator('form i').nth(2).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByText('10').click();
    await page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
    await page.getByText('17').click();
    await page.locator('form i').nth(4).click();
    await page.getByRole('option', { name: 'All Days' }).click();
    await page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
    await page.getByRole('option', { name: 'Specify Time' }).click();
    await page.locator('textarea').click();
    await page.locator('textarea').fill('Vacation');
    await page.getByRole('button', { name: 'Assign' }).click();
    await expect (page.getByText('Success', { exact: true })).toBeVisible();

})