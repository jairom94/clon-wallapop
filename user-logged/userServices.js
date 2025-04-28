export const getLoggedInUserInfo = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:8000/auth/me',{
        headers:{
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('No se pudo obtener la información del usuario')
    }
    const user = await response.json();
    return user;
}

export const userProducts = async (userID) => {
    let products = []
    try {        
        const res = await fetch(`http://localhost:8000/api/products?userId=${userID}`)
        products = await res.json();                
    } catch (error) {
        throw new Error('No ha sido posible cargar productos. Inténtalo de nuevo mas tarde.')
    }
    return {
        getProducts(){
            return products
        },
        totalProducts(){
            return products.length
        },
        totalShops(){
            return products.filter(p => p.type === 'Compra').length
        },
        totalSales(){
            return products.filter(p => p.type === 'Venta').length
        }
    }
        
};

export async function allCategories() {

    
    const response = await fetch("http://localhost:8000/api/categories");

    if (!response.ok) {
        throw new Error("El servidor no responde. Inténtalo más tarde.")
    }

    const categories = await response.json();

    return categories;
}