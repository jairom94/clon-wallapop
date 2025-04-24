document.addEventListener('DOMContentLoaded',()=>{
    const searchParams = new URLSearchParams(window.location.search);
    const fromPage = searchParams.get('from') ?? '';
    if(!!fromPage){
        const $linkLogin = document.querySelector('.link-login')
        $linkLogin.href += `?from=${fromPage}`
    }
})