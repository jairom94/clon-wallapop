import { User } from "./profileModel.js";
import { profileView } from "./profileView.js";

export async function profileController(userID) {
    const $userProfile = document.querySelector('.user-profile')
    const useUser = await User(userID)
    const user = useUser.getUser()
    const publicaciones = useUser.getSizeProducts()
    const totalCompras = useUser.totalCompras()
    const totalVentas = useUser.totalVentas()

    $userProfile.innerHTML = profileView(user,publicaciones,totalCompras,totalVentas)
    
}