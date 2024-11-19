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

export async function fetchSearchEvents(query: string, location: string, startDate: string, endDate: string, creatorFirstname: string, limit: number, offset: number) {
  try {
    const url = new URL(`https://localhost/api/search-events`);
    if (query) {
      url.searchParams.append('q', query);
    }
    if (location) {
      url.searchParams.append('location', location);
    }
    if (startDate) {
      url.searchParams.append('startDate', startDate);
    }
    if (endDate) {
      url.searchParams.append('endDate', endDate);
    }
    if (creatorFirstname) {
      url.searchParams.append('creatorFirstname', creatorFirstname);
    }
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());

    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export async function fetchNbEvents(){
  try {
    const res = await fetch(`https://localhost/api/nb-public-events`);
    const data = await res.json();
    return data;
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