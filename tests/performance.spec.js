import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'
import { PerformancePage } from '../pages/performance'

// test.describe.configure({ mode: 'serial' });

const employeeName = 'Timothy'
const trackerID = 'Tracker'
const KPIID = "KPI"

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const employeeName_full = employeeName.concat(randomNumber)
const trackerID_full = trackerID.concat(randomNumber)
const KPIID_full = KPIID.concat(randomNumber)


test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Performance = new PerformancePage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Performance.gotoPerformancePage()

});

// test('Add new employee', async ({ page }) => {

//     await page.getByRole('link', { name: 'PIM' }).click();
//     await page.getByRole('button', { name: ' Add' }).click();
//     await page.getByPlaceholder('First Name').click();
//     await page.getByPlaceholder('First Name').fill('Timothy');
//     await page.getByPlaceholder('Middle Name').click();
//     await page.getByPlaceholder('Middle Name').fill('Lewis');
//     await page.getByPlaceholder('Last Name').click();
//     await page.getByPlaceholder('Last Name').fill('Damiano');
//     await page.locator('form').getByRole('textbox').nth(4).click()
//     await page.locator('form').getByRole('textbox').nth(4).fill(randomNumber);
//     await page.getByRole('button', { name: 'Save' }).click();

// })

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