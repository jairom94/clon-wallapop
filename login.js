import { inputController } from "./input-custom/inputController.js";
import { loaderController } from "./loader/loaderController.js";
import { loginController } from "./login/loginController.js";
import { notificationController } from "./notification/notificationController.js";
import { REGEXP } from "./utils/constants.js"

document.addEventListener('DOMContentLoaded',()=>{
    const $formLogin = document.querySelector('.form-login')

    const $containerEmail = $formLogin.querySelector('.email');
    const $containerPassword = $formLogin.querySelector('.password');
    const inputEmail =  inputController($containerEmail,'email','email','Dirección de e-mail',(value)=>{
        const emailRegExp = new RegExp(REGEXP.mail);
        return !emailRegExp.test(value);
    },'El e-mail tiene formato incorrecto.'); 

    inputEmail.showInput();
    inputEmail.getInput().addEventListener('keyup',()=>{
        console.log(inputEmail.getValueInput());
    })
    
    const inputPassword =  inputController($containerPassword,'password','password','Contraseña',(value)=>{
        return value === '';
    }); 
    inputPassword.showInput();   

    const notification1 = notificationController();
    $formLogin.addEventListener('login-error',(e)=>{
        notification1.show(e.detail,'error')
    })
    const { show,hide } = loaderController();
    $formLogin.addEventListener('login-load-start',(e)=>{
        show();
    })
    $formLogin.addEventListener('login-load-finish',(e)=>{
        hide();
    })
    loginController();

    // const { show,hide } = loaderController();
    // show()
    // setTimeout(() => {
    //     hide()
    // }, 30000);
    
    // notification1.show('Hola mundo soy una notificacion con un texto algo extenso','info');    
    
    
})