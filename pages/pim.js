import { expect } from '@playwright/test';

exports.PIMPage = class PIMPage {

    constructor(page) {

        this.page = page
        this.dashboard_heading = page.getByRole('heading', { name: 'Dashboard' });
        this.PIM_button = page.getByRole('link', { name: 'PIM' })
        this.PIM_header = page.getByRole('heading', { name: 'PIM' })
        this.addEmployee_button = page.getByRole('button', { name: ' Add' })
        this.firstName_textbox = page.getByPlaceholder('First Name')
        this.middleName_textbox = page.getByPlaceholder('Middle Name')
        this.lastName_textbox = page.getByPlaceholder('Last Name')
        this.id_textbox = page.locator('form').getByRole('textbox').nth(4)
        this.save_button = page.getByRole('button', { name: 'Save' })

    }

    async gotoPIMPage() {

        await this.PIM_button.click()
        await expect(this.PIM_header).toBeVisible()

    }

    async addNewEmployee(firstName, middleName, lastName, randomNumber) {

        await this.addEmployee_button.click()
        await this.firstName_textbox.click()
        await this.firstName_textbox.fill(firstName)
        await this.middleName_textbox.click()
        await this.middleName_textbox.fill(middleName)
        await this.lastName_textbox.click()
        await this.lastName_textbox.fill(lastName)
        await this.id_textbox.click()
        await this.id_textbox.fill(randomNumber)
        await this.save_button.click()

        // await expect (page.getByRole('heading', { name: 'Timothy Amiano' })).toBeVisible();

    }

}