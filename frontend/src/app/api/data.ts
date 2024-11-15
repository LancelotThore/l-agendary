export async function fetchUser() {
    try {
        const response = await fetch("https://localhost:443/api/logged", {
        method : "GET",
        credentials: "include", // Inclure les cookies dans la requête
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


export async function updateUserProfile(firstname: string, lastname: string, age: string, bio: string) {
    try {
        const response = await fetch("https://localhost:443/api/user/update/profile", {
            method : "POST",
            credentials: "include", // Inclure les cookies dans la requête
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname,
                lastname,
                age,
                bio,
            }),
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


export async function updateUserSettings(email: string, password: string, newPassword: string) {
    try {
        const response = await fetch("https://localhost:443/api/user/update/settings", {
            method : "POST",
            credentials: "include", // Inclure les cookies dans la requête
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                newPassword,
            }),
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



export async function updateUserProfilePicture(imageUrl: string) {
    try {
        const response = await fetch('https://localhost:443/api/user/update/image', {
            method: 'POST',
            body: JSON.stringify({ imageUrl }),
            credentials: 'include', // Inclure les cookies dans la requête
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
