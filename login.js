import { inputController } from "./input-custom/inputController.js";

document.addEventListener('DOMContentLoaded',()=>{
    const $formLogin = document.querySelector('.form-login')
    // console.log(($formLogin));
    const $containerEmail = $formLogin.querySelector('.email');
    const $containerPassword = $formLogin.querySelector('.password');
    const inputEmail =  inputController($containerEmail,'email','Dirección de e-mail','El e-mail es requerido.'); 
    inputEmail.showInput();
    const inputPassword =  inputController($containerPassword,'password','Contraseña'); 
    inputPassword.showInput();   
    
    // emailInput.addEventListener('keyup',(e)=>{        
    //     console.log(e.target.value);
        
    // });
    // console.log(emailInput2);
    
    
})