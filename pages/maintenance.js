import { expect } from '@playwright/test';

exports.MaintenancePage = class MaintenancePage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.maintenance_button = page.getByRole('link', { name: 'Maintenance' })
        this.maintenance_heading = page.getByRole('heading', { name: 'Maintenance', exact: true })
        this.maintenance_password = page.locator('input[name="password"]')
        this.confirmation_button = page.getByRole('button', { name: 'Confirm' })

    }

    async gotoMaintenancePage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.maintenance_button.click()
        await this.maintenance_password.fill('admin123')
        await this.confirmation_button.click();
        await expect(this.maintenance_heading).toBeVisible()
    }

}