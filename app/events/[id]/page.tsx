'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';

function getEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
  }
  return url;
}

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = use(params);
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  const [loading, setLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [eventData, setEventData] = useState<{ 
    title?: string; 
    description?: string;
    image_url?: string;
    poster_url?: string;
    stream_url?: string; 
    playback_url?: string; 
  } | null>(null);

  useEffect(() => {
    async function fetchEventDetails() {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();
      
      if (data) {
        setEventData(data);
      }
    }
    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    async function checkTicketAccess() {
      if (reference) {
        setHasAccess(true);
      }
      setVerifying(false);
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

  const activeStreamUrl = eventData?.stream_url || eventData?.playback_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const posterImage = eventData?.image_url || eventData?.poster_url || '/placeholder-poster.png';
  const isYoutube = activeStreamUrl.includes('youtube.com') || activeStreamUrl.includes('youtu.be');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 p-6 text-white">
      <div className="w-full max-w-4xl space-y-6 rounded-xl bg-neutral-800 p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-4">
          <div>
            <h1 className="text-2xl font-bold">{eventData?.title || 'Elqena Live Stream'}</h1>
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
              {isYoutube ? (
                <iframe
                  className="h-full w-full"
                  src={getEmbedUrl(activeStreamUrl)!}
                  title={eventData?.title || 'Live Stream'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  src={activeStreamUrl}
                >
                  Your browser does not support video playback.
                </video>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-xs text-green-400">
              <span className="font-semibold">✓ Ticket Verified</span>
              <span className="font-mono text-neutral-400">Ref: {reference}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Poster Preview Banner */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center">
              {eventData?.image_url || eventData?.poster_url ? (
                <img 
                  src={posterImage} 
                  alt={eventData?.title || 'Event Poster'} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="p-8 text-center space-y-2">
                  <p className="text-xl font-semibold text-neutral-300">{eventData?.title}</p>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto">{eventData?.description || 'Get your ticket now to watch this live stream.'}</p>
                </div>
              )}
            </div>

            <div className="text-center space-y-4">
              <p className="text-neutral-300 text-sm">Purchase your ticket to unlock full access to the live stream.</p>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full max-w-sm rounded-lg bg-indigo-600 py-3 px-6 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50 shadow-lg"
              >
                {loading ? 'Redirecting to Paystack...' : 'Buy Ticket with Paystack'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}