import { myProductsController } from "./my-products/myProductsController.js";
import { getLoggedInUserInfo } from "./user-logged/userServices.js";

document.addEventListener('DOMContentLoaded',async (e)=>{
    const token = localStorage.getItem('token')
    if (!token) {
        const fromPage = window.location.pathname
        window.location = `/door.html?from=${fromPage}`;
    }

    const user = await getLoggedInUserInfo()

    myProductsController(user.id)
})