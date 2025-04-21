export const createProduct = async ({ title, descrption, price, type, category }) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/products', {
        method: "POST",
        body: JSON.stringify({
            title,
            descrption,
            price,
            type,
            category,
            images
        }),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    if (!response.ok) {
        // const data = await response.json();
        throw new Error('No se ha podido crear el producto.')
    }
}