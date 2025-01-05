import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { NewsfeedPage } from '../pages/newsfeed'

test.describe.configure({ mode: 'serial' });

const postName = 'Post'
const editName = 'Edit'
const commentName = 'Comment'
const shareName = 'Share'

export const random = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

const randomNumber = random()

const postName_full = postName.concat(randomNumber)
const editName_full = editName.concat(randomNumber)
const commentName_full = commentName.concat(randomNumber)
const shareName_full = shareName.concat(randomNumber)

test.beforeEach('login', async ({ page }) => {

    const Login = new LoginPage(page)
    const Newsfeed = new NewsfeedPage(page)

    await Login.gotoLoginPage()
    await Login.login('Admin', 'admin123')
    await Newsfeed.gotoNewsfeedPage()

});


test('Add post', async ({ page }) => {

    await page.getByPlaceholder('What\'s on your mind?').click();
    await page.waitForTimeout(500)
    await page.getByPlaceholder('What\'s on your mind?').fill(postName_full);
    await page.getByRole('button', { name: 'Post', exact: true }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Edit post', async ({ page }) => {

    await page.locator('li > .oxd-icon-button').first().click();
    await page.getByText('Edit Post').click();
    await page.getByRole('dialog').locator('textarea').click();
    await page.getByRole('dialog').locator('textarea').fill(editName_full);
    await page.getByRole('dialog').getByRole('button', { name: 'Post' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Like post', async ({ page }) => {

    await page.locator('#heart').first().click();
    await expect(page.getByText('1 Like').first()).toBeVisible();

});

test('Comment post', async ({ page }) => {

    await page.locator('.orangehrm-buzz-post-actions > button').first().click();
    await page.getByPlaceholder('Write your comment...').fill(commentName_full);
    await page.getByPlaceholder('Write your comment...').press('Enter');
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Share post', async ({ page }) => {

    await page.locator('.orangehrm-buzz-post-actions > button:nth-child(3)').first().click();
    await page.getByRole('dialog').getByPlaceholder('What\'s on your mind?').click();
    await page.getByRole('dialog').getByPlaceholder('What\'s on your mind?').fill(shareName_full);
    await page.getByRole('button', { name: 'Share', exact: true }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});

test('Delete post', async ({ page }) => {

    await page.locator('li > .oxd-icon-button').first().click();
    await page.getByText('Delete Post').click();
    await page.getByRole('button', { name: ' Yes, Delete' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();

});