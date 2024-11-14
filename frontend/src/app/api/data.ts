export async function fetchUser() {
    try {
        const response = await fetch("https://localhost:443/api/logged", {
        method : "GET",
        credentials: "include",
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        return null;
    }
}
