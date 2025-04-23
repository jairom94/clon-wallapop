export const productDetailModel = async (productID) => { 
    if (productID === 0) {
        throw new Error('No hay un producto asignado.')
    }   
    const response = await fetch(`http://localhost:8000/api/products/${productID}?_expand=user`)
    if (!response.ok) {
        throw new Error('Producto no disponible.')
    }
    const product = await response.json();
    return product
}