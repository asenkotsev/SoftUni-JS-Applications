import { register, login, checkResult, logout as apiLogout} from '../data.js';

export async function registerPage() {
    this.partials = {
        navbar: await this.load('./templates/common/navbar.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/register.hbs');
}

export async function registerPost() {
    try {
        if (this.params.email == '') {
            throw new Error('The email input must be filled');
        }
        if (this.params.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error('Passwords don\'t match');
        }

        const result = await register(this.params.email, this.params.password);
        checkResult(result);

         const loginResult = await login(this.params.email, this.params.password);
         checkResult(loginResult);
        
        this.app.userData.email = loginResult.email;
        this.app.userData.userId = loginResult.userId;
        

        this.redirect('#/home');
    } catch (err) {
        alert(err.message);
    }
}

export async function loginPage() {
    this.partials = {
        navbar: await this.load('./templates/common/navbar.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/login.hbs');
}

export async function loginPost() {
    try {
        const result = await login(this.params.email, this.params.password);
        checkResult(result);

        this.app.userData.email = result.email;
        this.app.userData.userId = result.userId;

        this.redirect('#/home');
    } catch (err) {
        alert(err.message);
    }
}

export async function logout() {
    try {
        await apiLogout();
        this.app.userData.userId = '';
        this.app.userData.email = '';

        this.redirect('#/login');
    } catch(err) {
        alert(err.message);
    }
}