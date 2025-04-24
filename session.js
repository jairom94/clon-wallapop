import { sessionController } from "./session/sessionController.js"

document.addEventListener('DOMContentLoaded',(e)=>{
    
    const $sessionMobile = document.querySelector('.session-navigation-mobile');
    
    $sessionMobile.addEventListener('no-authorized',()=>{
        // window.location = './door.html';
    });

    
    sessionController();
})