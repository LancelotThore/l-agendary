export async function fetchEvents() {
  try {
    const res = await fetch("https://localhost/api/events");
    const data = await res.json();
    return data["member"];
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export async function fetchPaginatedEvents(limit: number, offset: number) {
  try {
    const res = await fetch(`https://localhost/api/paginated-events?limit=${limit}&offset=${offset}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export async function fetchNbEvents() {
  try {
    const res = await fetch(`https://localhost/api/nb-public-events`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export async function fetchSearchEvents(query: string) {
  try {
    const res = await fetch(`https://localhost/api/search-events?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error searching events:", error);
    return null;
  }
}

export async function fetchHighlightedEvents() {
  try {
    const res = await fetch("https://localhost/api/highlighted-events");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching highlighted events:", error);
    return null;
  }
}

export async function fetchEvent(id: number) {
  try {
    const res = await fetch("https://localhost/api/events/" + id);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching highlighted events:", error);
    return null;
  }
}

export async function fetchCreator(url: string) {
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

export async function updateEvent(
  id: string,
  title: string,
  description: string,
  location: string,
  privacy: boolean,
  start_date: string,
  end_date: string,
  image: string
) {
  try {
    const response = await fetch("https://localhost:443/api/events/" + id, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
      body: JSON.stringify({
        title,
        description,
        location,
        privacy,
        start_date,
        end_date,
        image
      }),
    });

    if (!response.ok) {
      return null;
    }
}

export async function joinEvent(eventId: string) {
  try {
    const response = await fetch(`https://localhost:443/api/events/join/${eventId}`, {
      method: 'POST',
      headers: {
        'accept': 'application/ld+json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors || 'Erreur lors de l\'inscription à l\'événement');
    }
  } catch (error) {
    console.error('Error joining event:', error);
    throw new Error('Erreur lors de l\'inscription à l\'événement');
  }
}

export async function leaveEvent(eventId: string) {
  try {
    const response = await fetch(`https://localhost:443/api/events/leave/${eventId}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/ld+json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors || 'Erreur lors de la désinscription de l\'événement');
    }
  } catch (error) {
    console.error('Error leaving event:', error);
    throw new Error('Erreur lors de la désinscription de l\'événement');
  }
}

export async function isUserRegistered(eventId: number) {
  try {
    const response = await fetch(`https://localhost/api/users/is-registered/${eventId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/ld+json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors || 'Erreur lors de la vérification de l\'inscription');
    }
  } catch (error) {
    console.error('Error checking registration:', error);
    throw new Error('Erreur lors de la vérification de l\'inscription');
  }
}