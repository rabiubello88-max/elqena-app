import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { eventId, email = 'customer@example.com' } = await req.json();

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: 5000 * 100, // 5,000 NGN in kobo
        metadata: {
          event_id: eventId,
        },
        callback_url: `http://localhost:3000/events/${eventId}?status=success`,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json({ authorization_url: data.data.authorization_url });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}