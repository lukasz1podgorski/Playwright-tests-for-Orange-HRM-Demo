import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'
import { PerformancePage } from '../pages/performance'

test.describe.configure({ mode: 'serial' });

const employeeName = 'Adam'
const trackerID = 'Tracker'
const KPIID = "KPI"
const searchName = ' Thomas Smith'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const employeeName_full = employeeName.concat(randomNumber)
const trackerID_full = trackerID.concat(randomNumber)
const KPIID_full = KPIID.concat(randomNumber)
const searchName_full = employeeName_full.concat(searchName)


test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Performance = new PerformancePage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Performance.gotoPerformancePage()

});


test('Add KPI', async ({ page }) => {

    await page.getByText('Configure').click();
    await page.getByRole('menuitem', { name: 'KPIs' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(KPIID_full);
    await page.locator('form i').click();
    await page.getByRole('option', { name: 'QA Engineer' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

})

test('Add Tracker', async ({ page }) => {

    await page.getByLabel('Topbar Menu').getByText('Configure').click();
    await page.getByRole('menuitem', { name: 'Trackers' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(trackerID_full);
    await page.getByPlaceholder('Type for hints...').first().click();
    await page.getByPlaceholder('Type for hints...').first().fill('Timothy Lewis Amiano');
    await page.getByRole('option', { name: 'Timothy Lewis Amiano' }).click();
    await page.getByPlaceholder('Type for hints...').nth(1).click();
    await page.getByPlaceholder('Type for hints...').nth(1).fill('Peter');
    await page.getByRole('option', { name: 'Peter Mac Anderson' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(trackerID_full)).toBeVisible();

})

test('Add new employee and assign supervisor', async ({ page }) => {

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
    await page.getByRole('link', { name: 'Report-to' }).click();
    await page.locator('div').filter({ hasText: /^Assigned Supervisors Add No Records FoundNameReporting MethodActions$/ }).getByRole('button').click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill('timothy');
    await page.getByText('Timothy Lewis Amiano').click();
    await page.locator('form i').click();
    await page.getByText('Direct', { exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

})

test('Add review', async ({ page }) => {

    await page.locator('li').filter({ hasText: 'Manage Reviews' }).locator('i').click();
    await page.getByRole('menuitem', { name: 'Manage Reviews' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByPlaceholder('Type for hints...').first().click();
    await page.getByPlaceholder('Type for hints...').first().fill(employeeName_full);
    await page.getByText(searchName_full).click();
    await page.getByPlaceholder('Type for hints...').nth(1).click();
    await page.getByPlaceholder('Type for hints...').nth(1).fill('timothy');
    await page.getByText('Timothy Lewis Amiano').click();
    await page.locator('form i').first().click();
    await page.getByText('Today').click();
    await page.locator('form i').nth(1).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByText('14').click();
    await page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByText('14').click();
    await page.getByRole('button', { name: 'Activate' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

})