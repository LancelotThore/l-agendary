export async function fetchEvents() {
  try {
    const res = await fetch("https://localhost/api/highlighted-events");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching highlighted events:", error);
    return null;
  }
}

export async function fetchEvent(id : number) {
  try {
    const res = await fetch("https://localhost/api/events/" + id);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching highlighted events:", error);
    return null;
  }
}

export async function fetchCreator(url : string) {
  try {
    const res = await fetch("https://localhost" + url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching creator:", error);
    return null;
  }
}

export async function createEvent(
    title: string,
    description: string,
    privacy: boolean,
    location: string,
    start_date: string,
    end_date: string,
    imageUrl: string,
    creator: string
) {
    const formData = {
        title,
        description,
        privacy,
        location,
        start_date,
        end_date,
        image: imageUrl,
        creator
    };

    try {
        const response = await fetch('https://localhost:443/api/events', {
            method: 'POST',
            headers: {
                'accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.errors || 'Erreur lors de la création de l\'événement');
        }
    } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Erreur lors de la création de l\'événement');
    }
}