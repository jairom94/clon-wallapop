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


export const getProductsPaginate = async (page=1) => {
    let products = [];
    const limit = 8;
    let totalPages = 0;
    try {        
        const res = await fetch(`http://localhost:8000/api/products?_page=${page}&_limit=8`)
        const totalProducts = res.headers.get('X-Total-Count');
        totalPages = Math.ceil(totalProducts/limit)
        products = await res.json();                
    } catch (error) {
        throw new Error('No ha sido posible cargar productos. Inténtalo de nuevo mas tarde.')
    }
    return {
        products,
        totalPages
    }
        
};