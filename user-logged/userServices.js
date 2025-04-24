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