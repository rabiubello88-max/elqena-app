'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase'; // Adjust path if your Supabase client helper differs
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image_url: '',
  });

  useEffect(() => {
    const supabase = createClient();
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Redirect unauthenticated guests to login with return path
        router.push('/login?redirectTo=/events/create');
      } else {
        setUser(user);
      }
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.from('events').insert([
      {
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date).toISOString(),
        location: formData.location,
        image_url: formData.image_url,
        creator_id: user.id,
        status: 'pending', // Enforces moderation queue
      },
    ]);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({
        type: 'success',
        text: 'Your event has been submitted and is currently pending admin approval!',
      });
      setFormData({ title: '', description: '', date: '', location: '', image_url: '' });
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="p-8 text-center text-white">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 text-white rounded-xl my-10 shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Create a New Event</h1>

      {message && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.type === 'success' ? 'bg-green-600/20 text-green-400 border border-green-500' : 'bg-red-600/20 text-red-400 border border-red-500'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
            placeholder="e.g. Lagos Tech Summit 2026"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
            placeholder="Provide details about your event..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date & Time *</label>
            <input
              type="datetime-local"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              placeholder="e.g. Eko Hotels, Lagos or Online"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Banner Image URL</label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
            placeholder="https://example.com/banner.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded transition duration-200 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Event for Review'}
        </button>
      </form>
    </div>
  );
}