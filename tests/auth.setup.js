// import { test as setup, expect } from '@playwright/test';
// import path from 'path';

// const authFile = path.join(__dirname, '../playwright/.auth/user.json');

// setup('authenticate', async ({ page }) => {

//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//     await page.getByPlaceholder('Username').fill('Admin')
//     await page.getByPlaceholder('Password').fill('admin123')
//     await page.getByRole('button', { name: 'Login' }).click()

//     await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
//   // Perform authentication steps. Replace these actions with your own.
//   // Wait until the page receives the cookies.
//   //
//   // Sometimes login flow sets cookies in the process of several redirects.
//   // Wait for the final URL to ensure that the cookies are actually set.
// //   await page.waitForURL('https://github.com/');
//   // Alternatively, you can wait until the page reaches a state where all cookies are set.

//   // End of authentication steps.

//   await page.context().storageState({ path: authFile });
// });