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

export async function fetchEvent(id : number) {
  try {
    const res = await fetch("https://localhost/api/event/" + id);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching highlighted events:", error);
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

export async function createEventRegistration(email: string, event: string) {
  const formData = {
      event,
      email,
  };

  try {
      const response = await fetch('https://localhost:443/api/register-event', {
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
          if (response.status === 409) { // Conflict status code for duplicate unique data
              throw new Error('Erreur: Données dupliquées');
          }
          throw new Error(`Erreur lors de l'inscription à l'événement: ${response.status} ${response.statusText} - ${errorData.errors || 'Données incorrectes'}`);
      }
  } catch (error) {
      console.error('Error creating event registration:', error);
      throw new Error(`Erreur lors de l'inscription à l'événement: ${error.message}`);
  }
}

export async function confirmRegistration(token: string) {
  try {
      const response = await fetch('https://localhost:443/api/confirm-registration', {
          method: 'POST',
          headers: {
              'accept': 'application/ld+json',
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify({ token }),
          credentials: 'include'
      });

      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          const errorData = await response.json();
          throw new Error(`Erreur lors de la confirmation de l'inscription: ${response.status} ${response.statusText} - ${errorData.errors || 'Données incorrectes'}`);
      }
  } catch (error) {
      console.error('Error confirming registration:', error);
      throw new Error(`Erreur lors de la confirmation de l'inscription: ${error.message}`);
  }
}