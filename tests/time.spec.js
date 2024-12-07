import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { TimePage } from '../pages/time'

test.describe.configure({ mode: 'serial' });

const customerName = 'Customer'
const projectName = 'Project'
const noteName = 'Note'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const customerName_full = customerName.concat(randomNumber)
const projectName_full = projectName.concat(randomNumber)
const noteName_full = noteName.concat(randomNumber)

test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Time = new TimePage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Time.gotoTimePage()

});


test('Add new Customer', async ({ page }) => {

    await page.locator('span').filter({ hasText: 'Project Info' }).locator('i').click();
    await page.getByRole('menuitem', { name: 'Customers' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form input').click();
    await page.locator('form input').fill(customerName_full);
    await page.getByPlaceholder('Type description here').click();
    await page.getByPlaceholder('Type description here').fill(customerName_full);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(customerName_full).first()).toBeVisible()

});

test('Add project for the Customer', async ({ page }) => {


    await page.getByText('Project Info').click();
    await page.locator('li').filter({ hasText: /^Projects$/ }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(projectName_full);
    await page.locator('form div').filter({ hasText: 'NameCustomer Name Add Customer' }).getByPlaceholder('Type for hints...').click();
    await page.locator('form div').filter({ hasText: 'NameCustomer Name Add Customer' }).getByPlaceholder('Type for hints...').fill(customerName_full);
    await page.getByText(customerName_full).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible()

});

test('Punch in and punch out', async ({ page }) => {


    await page.getByText('Attendance').click();
    await page.getByRole('menuitem', { name: 'Punch In/Out' }).click();
    await page.getByPlaceholder('Type here').click();
    await page.getByPlaceholder('Type here').fill(noteName_full);
    await page.getByRole('button', { name: 'In' }).click();
    await page.getByPlaceholder('Type here').click();
    await page.getByPlaceholder('Type here').fill(noteName_full);
    await page.getByRole('button', { name: 'Out' }).click();
    await page.getByLabel('Topbar Menu').getByText('Attendance').click();
    await page.getByRole('menuitem', { name: 'My Records' }).click();
    await expect(page.getByText(noteName_full).first()).toBeVisible()

});
