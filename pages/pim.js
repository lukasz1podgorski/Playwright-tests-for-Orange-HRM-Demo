import { expect } from '@playwright/test';

exports.PIMPage = class PIMPage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.PIM_button = page.getByRole('link', { name: 'PIM' })
        this.PIM_header = page.getByRole('heading', { name: 'PIM' })

    }

    async gotoPIMPage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.PIM_button.click()
        await expect(this.PIM_header).toBeVisible()
    }

}