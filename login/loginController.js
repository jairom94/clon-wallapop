import { REGEXP } from "../utils/constants.js";
import { loginUser } from "./loginModel.js";

export const loginController = () => {
    const $formLogin = document.querySelector('.form-login');


    $formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const $email = $formLogin.querySelector('#email');
        const email = $email.value;
        const $password = $formLogin.querySelector('#password');
        const password = $password.value;
        const errors = [];
        //validations
        const emailRegExp = new RegExp(REGEXP.mail);
        if (!email) {
            errors.push('no ha ingresado su e-mail.')
        }
        if (email && !emailRegExp.test(email)) {
            errors.push('email con formato incorrecto.')
        }
        if (!password) {
            errors.push('no ha ingresado su contraseña.')
        }
        if (errors.length === 0) {
            const event = new CustomEvent('login-load-start');
            $formLogin.dispatchEvent(event);
            handleLoginUser(email,password,$formLogin);
        } else {
            errors.forEach(err => {
                const event = new CustomEvent('login-error', {
                    detail: err
                });
                $formLogin.dispatchEvent(event);
            })
        }

    })

    async function handleLoginUser(userEmail, password,formLogin) {
        try {
            const token = await loginUser(userEmail, password)
            localStorage.setItem('token', token);
            const event = new CustomEvent('login-ok', {
                detail: {
                    message: 'Se ha logeado con exito',
                    type:'success'
                }
            });
            formLogin.dispatchEvent(event);
        } catch (error) {
            const event = new CustomEvent('login-error', {
                detail: error.message
            });
            formLogin.dispatchEvent(event);
        } finally{
            const event = new CustomEvent('login-load-finish');
            formLogin.dispatchEvent(event);
        }
    }

}