import { expect } from '@playwright/test';

exports.RecruitmentPage = class RecruitmentPage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.recruitment_button = page.getByRole('link', { name: 'Recruitment' })
        this.recruitment_heading = page.getByRole('heading', { name: 'Recruitment', exact: true })

    }

    async gotoRecruitmentPage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.recruitment_button.click()
        await expect(this.recruitment_heading).toBeVisible()
    }

}