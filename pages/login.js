exports.LoginPage = class LoginPage {

    constructor(page) {

        this.page = page
        this.username_textbox = page.getByPlaceholder('Username')
        this.password_textbox = page.getByPlaceholder('Password')
        this.login_button = page.getByRole('button', { name: 'Login' })

    }

    async gotoLoginPage(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username, password){
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(password)
        await this.login_button.click()

    }

}