export async function fetchEvents() {
    try {
        const res = await fetch('https://localhost/api/highlighted-events');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching highlighted events:', error);
        return [];
    }
};