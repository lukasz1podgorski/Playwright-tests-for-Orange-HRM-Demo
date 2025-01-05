import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { MaintenancePage } from '../pages/maintenance'

test.describe.configure({ mode: 'serial' });

const employeeName = 'Adam'
const searchName = ' Thomas Smith'
const vacancyName = 'QA'
const hireCandidateName = 'Name'
const interviewTitle = 'Title'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const employeeName_full = employeeName.concat(randomNumber)
const searchName_full = employeeName_full.concat(searchName)
const vacancyName_full = vacancyName.concat(randomNumber)
const hireCandidateName_full = hireCandidateName.concat(randomNumber)
const hireCandidateMail = hireCandidateName_full.concat('@example.com')
const interviewTile_full = interviewTitle.concat(randomNumber)


test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Maintenance = new MaintenancePage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Maintenance.gotoMaintenancePage()

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

test('Download employee data', async ({ page }) => {

    await page.getByRole('link', { name: 'Access Records' }).click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill(employeeName_full);
    await page.getByText(searchName_full).click();
    await page.getByRole('button', { name: 'Search' }).click();
    const page1Promise = page.waitForEvent('popup');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const page1 = await page1Promise;
    const download = await downloadPromise;

});

test('Add vacancies', async ({ page }) => {

    await page.getByRole('link', { name: 'Recruitment' }).click();
    await page.getByRole('link', { name: 'Vacancies' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('div').filter({ hasText: /^Vacancy NameJob Title-- Select --$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Vacancy NameJob Title-- Select --$/ }).getByRole('textbox').fill(vacancyName_full);
    await page.locator('form i').click();
    await page.getByRole('option', { name: 'QA Engineer' }).click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill('t');
    await page.getByText('Timothy Lewis Amiano').click();
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('link', { name: 'Vacancies' }).click();
    // await expect(page.getByText('Success', { exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: vacancyName_full })).toBeVisible()

});

test('Hire Candidate', async ({ page }) => {

    await page.getByRole('link', { name: 'Recruitment' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill(hireCandidateName_full);
    await page.getByPlaceholder('Middle Name').click();
    await page.getByPlaceholder('Middle Name').fill(hireCandidateName_full);
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill(hireCandidateName_full);
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: vacancyName_full }).click();
    await page.getByPlaceholder('Type here').first().click();
    await page.getByPlaceholder('Type here').first().fill(hireCandidateMail);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Shortlist' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Schedule Interview' }).click();
    await page.locator('div:nth-child(2) > .oxd-grid-3 > div > .oxd-input-group > div:nth-child(2)').first().click();
    await page.locator('div:nth-child(2) > .oxd-grid-3 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').fill(interviewTile_full);
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill('t');
    await page.getByText('Timothy Lewis Amiano').click();
    await page.locator('form i').nth(1).click();
    await page.getByText('Today').click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Mark Interview Passed' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Offer Job' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Hire' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Status: Hired')).toBeVisible();

});

test('Purge candidate records', async ({ page }) => {

    await page.getByLabel('Topbar Menu').getByText('Purge Records').click();
    await page.getByRole('menuitem', { name: 'Candidate Records' }).click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill(vacancyName_full);
    await page.getByRole('option', { name: vacancyName_full }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: 'Purge All' }).click();
    await page.getByRole('button', { name: 'Yes, Purge' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Terminate employee', async ({ page }) => {

    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill(randomNumber);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: 'Job' }).click();
    await page.getByRole('button', { name: 'Terminate Employment' }).click();
    await page.getByRole('dialog').locator('i').first().click();
    await page.getByText('Today').click();
    await page.getByRole('dialog').locator('i').nth(1).click();
    await page.getByText('Contract Not Renewed').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Purge employee records', async ({ page }) => {

    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill(employeeName_full);
    await page.getByText(searchName_full).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: 'Purge' }).click();
    await page.getByRole('button', { name: 'Yes, Purge' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});