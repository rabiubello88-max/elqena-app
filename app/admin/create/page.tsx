'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    stream_url: '',
    date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('events').insert([
      {
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        stream_url: form.stream_url,
        date: form.date ? new Date(form.date).toISOString() : new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert('Error creating event: ' + error.message);
    } else {
      alert('Event created successfully!');
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
      <p className="text-zinc-400 mb-6">Add a new live-streaming event to Elqena.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Title</label>
          <input
            type="text"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Afrobeat Night Live"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            required
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the event..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (₦)</label>
          <input
            type="number"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stream URL (Video Source)</label>
          <input
            type="url"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.stream_url}
            onChange={(e) => setForm({ ...form, stream_url: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Event Date & Time</label>
          <input
            type="datetime-local"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-zinc-200 transition"
        >
          {loading ? 'Creating...' : 'Publish Event'}
        </button>
      </form>
    </main>
  );
}