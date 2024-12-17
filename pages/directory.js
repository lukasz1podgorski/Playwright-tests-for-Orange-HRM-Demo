import { expect } from '@playwright/test';

exports.DirectoryPage = class DirectoryPage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.directory_button = page.getByRole('link', { name: 'Directory' })
        this.directory_heading = page.getByRole('banner').locator('div').filter({ hasText: /^Directory$/ })

    }

    async gotoDirectoryPage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.directory_button.click()
        await expect(this.directory_heading).toBeVisible()
    }

}