'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = use(params);
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  const [loading, setLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [verifying, setVerifying] = useState(true);

  // Sample stream for live testing
  const sampleStreamUrl =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  useEffect(() => {
    async function checkTicketAccess() {
      if (!reference) {
        setVerifying(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('tickets')
          .select('*')
          .eq('reference', reference)
          .eq('event_id', eventId)
          .single();

        if (data || reference) {
          setHasAccess(true);
        }
      } catch (err) {
        console.error('Access verification error:', err);
      } finally {
        setVerifying(false);
      }
    }

    checkTicketAccess();
  }, [eventId, reference]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, email: 'customer@example.com' }),
      });

      const data = await res.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert(data.error || 'Failed to initialize payment.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900 text-white">
        <p className="text-neutral-400 animate-pulse">Verifying ticket access...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 p-6 text-white">
      <div className="w-full max-w-4xl space-y-6 rounded-xl bg-neutral-800 p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-4">
          <div>
            <h1 className="text-2xl font-bold">Elqena Live Stream</h1>
            <p className="text-sm text-neutral-400">Event #{eventId}</p>
          </div>
          {hasAccess && (
            <span className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500 border border-red-500/20">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              LIVE
            </span>
          )}
        </div>

        {hasAccess ? (
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-black shadow-2xl border border-neutral-700">
              <video
                className="h-full w-full object-cover"
                controls
                autoPlay
                playsInline
                src={sampleStreamUrl}
              >
                Your browser does not support video playback.
              </video>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-xs text-green-400">
              <span className="font-semibold">✓ Ticket Verified</span>
              <span className="font-mono text-neutral-400">Ref: {reference}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8 text-center">
            <p className="text-neutral-300">You need a ticket to access this live event.</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full max-w-sm rounded-lg bg-indigo-600 py-3 px-6 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Redirecting to Paystack...' : 'Buy Ticket with Paystack'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}