import { REGEXP } from "../utils/constants.js";
import { registerUser } from "./registerModel.js";

export function registerController() {
    const $formRegister = document.querySelector('.form-register');
    $formRegister.addEventListener('submit',(e)=>{
        e.preventDefault();
        const $name = $formRegister.querySelector('#name');
        const name = $name.value;
        const $email = $formRegister.querySelector('#email');
        const email = $email.value;
        const $password = $formRegister.querySelector('#password');
        const password = $password.value;
        const $terms = $formRegister.querySelector('#terms_check');
        const terms_allow = $terms.checked;
        
        const errors = [];
        //validations
        if(!name) {
            errors.push('el nombre es obligatorio.')
        }
        if(!email) {
            errors.push('el email es obligatorio.')
        }
        const emailRegExp = new RegExp(REGEXP.mail);
        if(email && !emailRegExp.test(email)){
            errors.push('el email no tiene el formato correcto.')
        }
        if(!password){
            errors.push('la contraseña es obligatorio.')
        }
        if(password & password.length < 4){
            errors.push('la contraseña debe ser mínimo de 4 caracteres.')
        }
        if (!terms_allow) {
            errors.push('no ha aceptado las condiciones de uso.')
            $terms.classList.add('error')
        }else{
            $terms.classList.remove('error');
        }
        if(errors.length === 0){
            //Show loader 
            const event = new CustomEvent('register-load-start');
            $formRegister.dispatchEvent(event);
            //Fetch to register
            handleRegisterUser(name,email,password)
        }else{
            errors.forEach(err => {
                const event = new CustomEvent('register-error',{
                    detail:err
                });
                $formRegister.dispatchEvent(event);
            })
        }
    });
    async function handleRegisterUser(name,emal,password){
        try {
            await registerUser(name,emal,password)
            const event = new CustomEvent('register-ok', {
                detail: {
                    message:'register success',
                    type:'success'
                }
            });
            $formRegister.dispatchEvent(event);
        } catch (error) {
            const event = new CustomEvent('register-error', {
                detail: error.message
            });
            $formRegister.dispatchEvent(event);
        } finally {
            //Show loader 
            const event = new CustomEvent('register-load-finish');
            $formRegister.dispatchEvent(event);
        }

    }
}