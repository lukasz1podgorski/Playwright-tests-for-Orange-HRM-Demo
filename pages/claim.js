import { expect } from '@playwright/test';

exports.ClaimPage = class ClaimPage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.claim_button = page.getByRole('link', { name: 'Claim' })
        this.claim_heading = page.getByRole('heading', { name: 'Claim', exact: true })

    }

    async gotoClaimPage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.claim_button.click()
        await expect(this.claim_heading).toBeVisible()
    }

}