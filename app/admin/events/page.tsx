'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const fetchEvents = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', filter)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const handleStatusChange = async (eventId: string, newStatus: 'approved' | 'rejected') => {
    const supabase = createClient();
    const { error } = await supabase
      .from('events')
      .update({
        status: newStatus,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', eventId);

    if (!error) {
      fetchEvents(); // Refresh queue
    } else {
      alert('Error updating event: ' + error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-900 text-white min-h-screen my-8 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-6">Event Moderation Queue</h1>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-slate-800 pb-3">
        {(['pending', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg capitalize font-medium transition ${
              filter === tab
                ? 'bg-amber-500 text-black font-semibold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400">Loading moderation queue...</div>
      ) : events.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-slate-950/50 rounded-lg border border-slate-800">
          No {filter} events found.
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-5 bg-slate-800/80 rounded-lg border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-amber-400">{event.title}</h2>
                <p className="text-sm text-slate-300 line-clamp-2">{event.description || 'No description provided.'}</p>
                <div className="text-xs text-slate-400 flex flex-wrap gap-4 pt-1">
                  <span>📅 {new Date(event.date).toLocaleString()}</span>
                  <span>📍 {event.location || 'Remote / Unspecified'}</span>
                  <span>🕒 Submitted: {new Date(event.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {filter === 'pending' && (
                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    onClick={() => handleStatusChange(event.id, 'approved')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(event.id, 'rejected')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-lg transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}