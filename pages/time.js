import { expect } from '@playwright/test';

exports.TimePage = class TimePage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.time_button = page.getByRole('link', { name: 'Time' })
        this.time_heading = page.getByRole('heading', { name: 'Time', exact: true })

    }

    async gotoTimePage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.time_button.click()
        await expect(this.time_heading).toBeVisible()
    }

}