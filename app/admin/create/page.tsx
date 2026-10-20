
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

  // Convert an event title into a URL-friendly slug.
  const makeSlug = (title: string) => {
    return title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    const title = form.title.trim();
    const description = form.description.trim();
    const streamUrl = form.stream_url.trim();
    const price = Number(form.price);
    const slugBase = makeSlug(title);

    if (!title || !description || !streamUrl) {
      alert('Please complete all event fields.');
      return;
    }

    if (!slugBase) {
      alert('Please enter a valid event title.');
      return;
    }

    if (
      form.price.trim() === '' ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      alert('Please enter a valid event price.');
      return;
    }

    if (!form.date || Number.isNaN(new Date(form.date).getTime())) {
      alert('Please choose a valid event date and time.');
      return;
    }

    try {
      new URL(streamUrl);
      if (!/^https?:$/.test(new URL(streamUrl).protocol)) {
        alert('The stream URL must start with http:// or https://.');
        return;
      }
    } catch {
      alert('Please enter a valid stream URL.');
      return;
    }

    setLoading(true);

    try {
      // Confirm that an authenticated Supabase user is signed in.
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        alert(
          'You are not logged in. Please sign in with your Elqena admin account.'
        );
        router.push('/login');
        return;
      }

      // Generate a unique slug without overwriting an existing event.
      let slug = slugBase;
      let suffix = 2;

      while (true) {
        const { data: existingEvent, error: slugError } =
          await supabase
            .from('events')
            .select('id')
            .eq('slug', slug)
            .limit(1)
            .maybeSingle();

        if (slugError) {
          console.error('Could not check event slug:', slugError);
          alert(
            'Could not check the event URL: ' + slugError.message
          );
          return;
        }

        if (!existingEvent) break;

        slug = `${slugBase}-${suffix}`;
        suffix += 1;

        if (suffix > 1000) {
          alert('Could not generate a unique event URL. Try another title.');
          return;
        }
      }
console.log('Authenticated user ID:', user.id);
console.log('Authenticated user email:', user.email);

      const { error } = await supabase.from('events').insert({
        creator_id: user.id,
        title,
        slug,
        description,
        price_ngn: price,
        playback_url: streamUrl,
        scheduled_start_time: new Date(form.date).toISOString(),
      });

      if (error) {
        console.error('Error creating event:', error);
        alert('Error creating event: ' + error.message);
        return;
      }

      alert('Event created successfully!');
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Unexpected event creation error:', err);
      alert('Something went wrong while creating the event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Create New Event
      </h1>

      <p className="text-zinc-400 mb-6">
        Add a new live-streaming event to Elqena.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Event Title
          </label>
          <input
            type="text"
            required
            maxLength={150}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="e.g. Afrobeat Night Live"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            required
            rows={3}
            maxLength={5000}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Describe the event..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Price (₦)
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Stream URL (Video Source)
          </label>
          <input
            type="url"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.stream_url}
            onChange={(e) =>
              setForm({ ...form, stream_url: e.target.value })
            }
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Event Date &amp; Time
          </label>
          <input
            type="datetime-local"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-zinc-200 transition disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Publish Event'}
        </button>
      </form>
    </main>
  );
}
