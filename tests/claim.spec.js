import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { ClaimPage } from '../pages/claim'

test.describe.configure({ mode: 'serial' });

const employeeName = 'Adam'
const searchName = ' Thomas Smith'
const eventName = 'Event'
const expenseName = 'Expense'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const employeeName_full = employeeName.concat(randomNumber)
const searchName_full = employeeName_full.concat(searchName)
const eventName_full = eventName.concat(randomNumber)
const expenseName_full = expenseName.concat(randomNumber)

test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Claim = new ClaimPage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Claim.gotoClaimPage()

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
    await page.getByRole('link', { name: 'Job' }).click();
    await page.locator('.oxd-select-text--after > .oxd-icon').first().click();
    await page.getByText('QA Engineer').click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Add event and expense type', async ({ page }) => {
    
    await page.getByText('Configuration').click();
    await page.getByRole('menuitem', { name: 'Events' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(eventName_full);
    await page.locator('textarea').click();
    await page.locator('textarea').fill(randomNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
    await page.getByLabel('Topbar Menu').getByText('Configuration').click();
    await page.getByRole('menuitem', { name: 'Expense Types' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(expenseName_full);
    await page.locator('textarea').click();
    await page.locator('textarea').fill(randomNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Add new employee claim', async ({ page }) => {

    await page.getByRole('button', { name: ' Assign Claim' }).click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill(employeeName_full);
    await page.getByText(searchName_full).click();
    await page.locator('form i').first().click();
    await page.getByText(eventName_full).click();
    await page.locator('form i').nth(1).click();
    await page.getByText('Euro').click();
    await page.locator('textarea').click();
    await page.locator('textarea').fill(randomNumber);
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('button', { name: ' Add' }).first().click();
    await page.getByRole('dialog').locator('i').first().click();
    await page.getByText(expenseName_full).click();
    await page.getByRole('dialog').locator('i').nth(1).click();
    await page.getByText('Today').click();
    await page.getByRole('dialog').getByRole('textbox').nth(1).click();
    await page.getByRole('dialog').getByRole('textbox').nth(1).fill('100');
    await page.getByRole('dialog').locator('textarea').click();
    await page.getByRole('dialog').locator('textarea').fill(randomNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Submit claim', async ({ page }) => {
    
    await page.getByRole('link', { name: 'Submit Claim' }).click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: eventName_full }).click();
    await page.locator('form i').nth(1).click();
    await page.getByRole('option', { name: 'Euro' }).click();
    await page.locator('textarea').click();
    await page.locator('textarea').fill(randomNumber);
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('button', { name: ' Add' }).first().click();
    await page.getByRole('dialog').locator('i').first().click();
    await page.getByText(expenseName_full).click();
    await page.getByRole('dialog').locator('i').nth(1).click();
    await page.getByText('Today').click();
    await page.getByRole('dialog').getByRole('textbox').nth(1).click();
    await page.getByRole('dialog').getByRole('textbox').nth(1).fill('100');
    await page.getByRole('dialog').locator('textarea').click();
    await page.getByRole('dialog').locator('textarea').fill(randomNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Cancel claim', async ({ page }) => {
    
    await page.getByRole('link', { name: 'My Claims' }).click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: eventName_full }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: 'View Details' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});