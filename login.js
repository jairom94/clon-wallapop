import { inputController } from "./input-custom/inputController.js";
import { loaderController } from "./loader/loaderController.js";
import { loginController } from "./login/loginController.js";
import { notificationController } from "./notification/notificationController.js";
import { REGEXP } from "./utils/constants.js";

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

    //Events Login
    const notification1 = notificationController();
    $formLogin.addEventListener('login-error',(e)=>{
        notification1.show(e.detail,'error')
    })
    $formLogin.addEventListener('login-ok',(e)=>{
        const searchParams = new URLSearchParams(window.location.search);
        const fromPage = searchParams.get('from') ?? '';
        if (!!fromPage) {
            window.location = fromPage;
        }else {
            window.location = './index.html'
        }
    })

    //Events loading
    const $contLoader = document.querySelector('.cont-loader');
    const { show,hide } = loaderController($contLoader);
    $formLogin.addEventListener('login-load-start',(e)=>{
        show();
    })
    $formLogin.addEventListener('login-load-finish',(e)=>{
        hide();
    })

    
    loginController();
    
})