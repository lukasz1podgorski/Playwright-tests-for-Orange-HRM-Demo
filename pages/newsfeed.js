import { expect } from '@playwright/test';

exports.NewsfeedPage = class NewsfeedPage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.newsfeed_button = page.getByRole('link', { name: 'Buzz' })
        this.newsfeed_heading = page.getByRole('heading', { name: 'Buzz', exact: true })

    }

    async gotoNewsfeedPage(){
        await expect(this.dashboard_heading).toBeVisible()
        await this.newsfeed_button.click()
        await expect(this.newsfeed_heading).toBeVisible()
    }

}