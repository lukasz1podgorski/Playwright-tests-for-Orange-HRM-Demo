import { expect } from '@playwright/test';

exports.AdminPage = class AdminPage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.admin_button = page.getByRole('link', { name: 'Admin' })
        this.admin_heading = page.getByRole('heading', { name: 'Admin' })

    }

    async gotoAdminPage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.admin_button.click()
        await expect(this.admin_heading).toBeVisible()
    }

}