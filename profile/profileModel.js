import { getLoggedInUserInfo, userProducts } from "../user-logged/userServices.js";

export async function User(userID) {
    let products;
    let user;
    let totalProducts;
    let totalShops;
    let totalSales;

    try {
        user = await getLoggedInUserInfo();
        const useProducts = await userProducts(userID);
        products = useProducts.getProducts()
        totalProducts = useProducts.totalProducts()
        totalShops = useProducts.totalShops()
        totalSales = useProducts.totalSales()

    } catch (error) {
        throw new Error(error.message)
    }

    return {
        getUser(){
            return user
        },
        getProducts(){
            return products
        },
        getSizeProducts(){
            return totalProducts
        },
        totalCompras(){
            return totalShops
        },
        totalVentas(){
            return totalSales
        }
    }
}