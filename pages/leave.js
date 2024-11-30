import { expect } from '@playwright/test';

exports.LeavePage = class LeavePage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.leave_button = page.getByRole('link', { name: 'Leave' })
        this.leave_heading = page.getByRole('heading', { name: 'Leave', exact: true })

    }

    async gotoLeavePage(){
        await this.leave_button.click()
        await expect(this.leave_heading).toBeVisible()
    }

}