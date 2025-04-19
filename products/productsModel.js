export const getProducts = async () => {
    let products = [];
    try {        
        const res = await fetch('http://localhost:8000/api/products')
        products = await res.json();                
    } catch (error) {
        throw new Error('No ha sido posible cargar productos. Inténtalo de nuevo mas tarde.')
    }
    return products
        
};