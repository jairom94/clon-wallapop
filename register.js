import { inputController } from "./input-custom/inputController.js";
import { loaderController } from "./loader/loaderController.js";
import { notificationController } from "./notification/notificationController.js";
import { registerController } from "./register/registerController.js";
import { REGEXP } from "./utils/constants.js";

document.addEventListener('DOMContentLoaded', () => {
    const $formRegister = document.querySelector('.form-register');

    const $containerName = $formRegister.querySelector('.name');
    const $containerEmail = $formRegister.querySelector('.email');
    const $containerPassword = $formRegister.querySelector('.password');

    
    const inputName = inputController($containerName, 'name', 'name', 'Nombre y apellidos', (value) => {
        return value === '';
    }, 'El nombre es obligatorio.');
    inputName.showInput();
    
    const inputEmail = inputController($containerEmail, 'email', 'email', 'Dirección de e-mail', (value) => {
        const emailRegExp = new RegExp(REGEXP.mail);
        return !emailRegExp.test(value);
    }, 'El e-mail tiene formato incorrecto.');
    inputEmail.showInput();

    const inputPassword = inputController($containerPassword, 'password', 'password', 'Contraseña', (value) => {
        return value === '';
    });
    inputPassword.showInput();

    //Events to show inputs with errors 
    $formRegister.addEventListener('submit',()=>{
        inputName.validateInput();
        inputEmail.validateInput();
        inputPassword.validateInput();
    })
    
    //Events Register
    const notifications = notificationController();
    $formRegister.addEventListener('register-ok',(e)=>{
        notifications.show(e.detail.message,e.detail.type)
    })
    $formRegister.addEventListener('register-error',(e)=>{
        notifications.show(e.detail,'error');
    })
    //Evento loading
    const $contLoader = document.querySelector('.cont-loader');
    const loader = loaderController($contLoader);
    $formRegister.addEventListener('register-load-start',(e)=>{
        loader.show();
    })
    $formRegister.addEventListener('register-load-finish',(e)=>{
        loader.hide();
    })
    registerController();
})