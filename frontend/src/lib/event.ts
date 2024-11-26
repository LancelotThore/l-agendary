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

export async function fetchSearchEvents(query: string | null, location: string | null, startDate: string | null, endDate: string | null, creatorFirstname: string | null, limit: number, offset: number) {
  try {
    const url = new URL(`https://localhost/api/search-events`);
    if (query) url.searchParams.append('q', query);
    if (location) url.searchParams.append('location', location);
    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);
    if (creatorFirstname) url.searchParams.append('creatorFirstname', creatorFirstname);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return {
      total: data.total,
      events: data.events
    };
  } catch (error) {
    console.error("Error fetching events:", error);
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

export async function fetchUniqueLocations() {
  try {
    const res = await fetch("https://localhost/api/unique-locations");
    const data = await res.json();
    return data.map((location: { location: string }) => location.location);
  } catch (error) {
    console.error("Error fetching unique locations:", error);
    return [];
  }
}

export async function fetchUniqueUserNames() {
  try {
    const res = await fetch("https://localhost/api/unique-user-names");
    const data = await res.json();
    return data.map((user: { firstname: string }) => String(user.firstname));
  } catch (error) {
    console.error("Error fetching unique user names:", error);
    return [];
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

    const data = await response.json();
    return data;

  } catch (error) {
    return null;
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const response = await fetch(`https://localhost:443/api/events/${eventId}`, {
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
      throw new Error(errorData.errors || 'Erreur lors de la suppression de l\'événement');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Erreur lors de la suppression de l\'événement');
  }
}
