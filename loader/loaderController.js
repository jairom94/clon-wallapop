import { buildLoaderLogin } from "./loaderView.js";

export function loaderController($contLoader){
    // const $contLoader = document.querySelector('.cont-loader');

    return {
        show(){
            const $loader = document.createElement('div');
            $loader.classList.add('loader');
            $loader.innerHTML = buildLoaderLogin();
            $contLoader.innerHTML = '';
            $contLoader.appendChild($loader);
            $contLoader.showModal();
        },
        hide(){
            $contLoader.close();
        }
    }
}