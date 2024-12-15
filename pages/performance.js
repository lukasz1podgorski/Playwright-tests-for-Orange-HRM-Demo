import { expect } from '@playwright/test';

exports.PerformancePage = class PerformancePage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.performance_button = page.getByRole('link', { name: 'Performance' })
        this.performance_heading = page.getByRole('heading', { name: 'Performance', exact: true })

    }

    async gotoPerformancePage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.performance_button.click()
        await expect(this.performance_heading).toBeVisible()
    }

}