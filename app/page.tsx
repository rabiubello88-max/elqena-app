import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for server component
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const revalidate = 0; // Disable cache to always fetch latest events

async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Elqena Live Platform
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Live-streaming and ticketed entertainment.
        </p>

        <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center text-gray-400">
            <p>No live events found yet.</p>
            <p className="text-sm mt-2 text-zinc-500">
              Add some events in your Supabase dashboard to see them appear here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event: any) => (
              <div 
                key={event.id} 
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <p className="text-emerald-400 font-semibold mb-4">
                    ₦{event.price ? event.price.toLocaleString() : 'Free'}
                  </p>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-block bg-white text-black text-center font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition"
                >
                  Get Ticket / Watch
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}