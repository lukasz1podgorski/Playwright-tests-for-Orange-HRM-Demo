import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { RecruitmentPage } from '../pages/recruitment'

test.describe.configure({ mode: 'serial' });

const vacancyName = 'QA'
const hireCandidateName = 'Name'
const rejectCandidateName = 'Name_'
const interviewTitle = 'Title'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const vacancyName_full = vacancyName.concat(randomNumber)
const hireCandidateName_full = hireCandidateName.concat(randomNumber)
const hireCandidateMail = hireCandidateName_full.concat('@example.com')
const interviewTile_full = interviewTitle.concat(randomNumber)
const rejectCandidateName_full = rejectCandidateName.concat(randomNumber)
const rejectCandidateMail = rejectCandidateName_full.concat('@example.com')

test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Recruitment = new RecruitmentPage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Recruitment.gotoRecruitmentPage()

});


test('Add vacancies', async ({ page }) => {

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

test('Reject Candidate', async ({ page }) => {

    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill(rejectCandidateName_full);
    await page.getByPlaceholder('Middle Name').click();
    await page.getByPlaceholder('Middle Name').fill(rejectCandidateName_full);
    await page.getByPlaceholder('Middle Name').click();
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill(rejectCandidateName_full);
    await page.getByPlaceholder('Last Name').click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: vacancyName_full }).click();
    await page.getByPlaceholder('Type here').first().click();
    await page.getByPlaceholder('Type here').first().fill(rejectCandidateMail);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Reject' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Status: Rejected')).toBeVisible();

});

test('Delete Vacancy', async ({ page }) => {

    await page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
    await page.getByRole('option', { name: vacancyName_full }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: '' }).first().click();
    await page.getByRole('button', { name: ' Yes, Delete' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});