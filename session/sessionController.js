import { sessionView } from "./sessionView.js"

export function sessionController() {
    const token = !!localStorage.getItem('token');
    const $sessionMobile = document.querySelector('.session-navigation-mobile');
    
    const sessionView_ = sessionView($sessionMobile);
    if(token){
        sessionView_.buildAuthorized(()=>{
            localStorage.removeItem('token');
            sessionView_.removeAuthorized();
            sessionController();
            window.location = '../index.html'
        });
        // sessionView_.removeUnAuthorized();
    }else{
        sessionView_.buildUnAuthorized();
        sessionView_.removeAuthorized();
        const event = new CustomEvent('no-authorized');
        $sessionMobile.dispatchEvent(event)
    }
}


