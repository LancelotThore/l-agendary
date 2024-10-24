import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const res = await fetch('http://php/api/users/3', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    console.log('res:', res);

    if (!res.ok) {
      console.error('Failed to fetch session info:', res.statusText);
      return NextResponse.json({ error: 'Failed to fetch session info' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching session info:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
