export async function getCategories() {

    
    const response = await fetch("http://localhost:8000/api/categories");

    if (!response.ok) {
        throw new Error("El servidor no responde. Inténtalo más tarde.")
    }

    const categories = await response.json();

    return categories;
}