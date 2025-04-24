export function sessionView($navigationMobile) {
    const $profileSession = document.createElement('li');
    const $logoutSession = document.createElement('li');


    const $loginSession = document.createElement('li');
    const $registerSession = document.createElement('li');


    return {
        buildAuthorized(handleClickBtn) {
            const $linkProfile = `
                <a href="./profile.html">
                    <div class="icon-cont">
                        <iconify-icon icon="mdi:face-happy"></iconify-icon>
                    </div>
                    <span>Tú</span>
                </a>
            `;
            const $btnLogout = `
                <button id='btn-logout-mobile'>
                    <div class="icon-cont">
                        <iconify-icon icon="heroicons-outline:logout"></iconify-icon>
                    </div>
                    <span>Logout</span>
                </button>
            `;

            $profileSession.classList.add('profile-session-mobile');
            $profileSession.innerHTML = $linkProfile;

            $logoutSession.classList.add('logout-session-mobile');
            $logoutSession.innerHTML = $btnLogout;            

            $navigationMobile.appendChild($profileSession)
            $navigationMobile.appendChild($logoutSession)

            const btn = document.querySelector('#btn-logout-mobile');
            btn.addEventListener('click',()=>{
                handleClickBtn();
            })
        },
        removeAuthorized() {
            $profileSession.remove()
            $logoutSession.remove()
        },
        buildUnAuthorized() {
            const $linkLogin = `
                <a href="./login.html">
                    <div class="icon-cont">
                        <iconify-icon icon="ant-design:login-outlined"></iconify-icon>
                    </div>
                    <span>Login</span>
                </a>
            `;
            const $linkRegister = `
                <a href="./register.html">
                    <div class="icon-cont">
                        <iconify-icon icon="mdi:register"></iconify-icon>
                    </div>
                    <span>Register</span>
                </a>
            `;

            $loginSession.classList.add('login-mobile');
            $loginSession.innerHTML = $linkLogin;

            $registerSession.classList.add('register-mobile');
            $registerSession.innerHTML = $linkRegister;

            $navigationMobile.appendChild($loginSession)
            $navigationMobile.appendChild($registerSession)
        },
        removeUnAuthorized() {
            $loginSession.remove()
            $registerSession.remove()
        },


    }
}

export function unAuthorized($navigationMobile) {
    



}