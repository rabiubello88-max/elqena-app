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

  console.log('Homepage events query:', { data, error });
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-[#05090d] text-[#f5f8fa] font-sans antialiased selection:bg-[#67e3c5] selection:text-[#06100f]">
      {/* Background Radial Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 82% 0%, rgba(103,227,197,0.13), transparent 27%), linear-gradient(180deg, #071019 0%, #04080c 100%)'
        }}
      />

      <div className="relative z-10 w-[min(1160px,92%)] mx-auto">
        {/* Navigation */}
        <nav className="h-[82px] flex items-center justify-between relative z-20">
          <Link href="#" className="text-[25px] font-black tracking-[0.16em]">
            ELQ<span className="text-[#67e3c5]">E</span>NA
          </Link>
          <div className="hidden md:flex gap-[27px] text-[#c4d0d7] text-[14px]">
            <a href="#how" className="hover:text-white transition">How It Works</a>
            <a href="#events" className="hover:text-white transition">Live Events</a>
            <a href="#platform" className="hover:text-white transition">Platform</a>
            <a href="#team" className="hover:text-white transition">Team</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
          <a 
            href="#contact" 
            className="px-4 py-[10px] border border-[rgba(103,227,197,0.4)] rounded-[9px] text-[#67e3c5] font-extrabold text-[13px] hover:bg-[#67e3c5]/10 transition"
          >
            Get in Touch
          </a>
        </nav>

        {/* Hero Section */}
        <section className="py-20 md:py-32 min-h-[calc(100vh-82px)] grid items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-[65px] items-center">
            <div>
              <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
                The future of live entertainment
              </div>
              <h1 className="text-[clamp(42px,6vw,86px)] leading-[0.96] tracking-[-0.06em] font-extrabold m-0 max-w-[800px]">
                The venue no longer defines{' '}
                <span className="bg-gradient-to-r from-white via-[#67e3c5] to-[#79a7ff] bg-clip-text text-transparent">
                  your audience.
                </span>
              </h1>
              <p className="text-[#aab7c1] text-[19px] max-w-[720px] my-[28px]">
                Elqena enables artists, comedians and creators to perform live from a studio, private venue or home — and sell access to audiences anywhere in the world.
              </p>
              <div className="flex gap-[13px] flex-wrap">
                <a 
                  href="#events" 
                  className="px-[21px] py-[13px] bg-[#67e3c5] border border-[#67e3c5] text-[#06100f] rounded-[9px] text-[14px] font-extrabold hover:bg-[#52d2b3] transition"
                >
                  Explore Live Events
                </a>
                <a 
                  href="#contact" 
                  className="px-[21px] py-[13px] bg-white/[0.035] border border-white/10 rounded-[9px] text-[14px] font-extrabold hover:bg-white/10 transition"
                >
                  Talk to Elqena
                </a>
              </div>
            </div>

            {/* Signal Box */}
            <div className="h-[380px] md:h-[470px] border border-white/10 rounded-[30px] bg-gradient-to-br from-white/[0.075] to-white/[0.015] relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <div className="absolute w-[320px] h-[320px] rounded-full left-1/2 top-[60px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(103,227,197,0.28),rgba(103,227,197,0.04)_52%,transparent_70%)] border border-[rgba(103,227,197,0.25)] shadow-[0_0_80px_rgba(103,227,197,0.12)]" />
              <div className="absolute left-1/2 top-[190px] -translate-x-1/2 text-[44px] md:text-[62px] font-black tracking-[0.15em] text-white/90">
                LIVE
              </div>
              <div className="absolute left-[10%] right-[10%] bottom-[55px] grid grid-cols-7 gap-[9px] items-end h-[90px]">
                <i className="block rounded-t-[5px] bg-gradient-to-b from-[#67e3c5] to-[#79a7ff] opacity-80 h-[24%]" />
                <i className="block rounded-t-[5px] bg-gradient-to-b from-[#67e3c5] to-[#79a7ff] opacity-80 h-[50%]" />
                <i className="block rounded-t-[5px] bg-gradient-to-b from-[#67e3c5] to-[#79a7ff] opacity-80 h-[35%]" />
                <i className="block rounded-t-[5px] bg-gradient-to-b from-[#67e3c5] to-[#79a7ff] opacity-80 h-[82%]" />
                <i className="block rounded-t-[5px] bg-gradient-to-b from-[#67e3c5] to-[#79a7ff] opacity-80 h-[58%]" />
                <i className="block rounded-t-[5px] bg-gradient-to-b from-[#67e3c5] to-[#79a7ff] opacity-80 h-[72%]" />
                <i className="block rounded-t-[5px] bg-gradient-to-b from-[#67e3c5] to-[#79a7ff] opacity-80 h-[42%]" />
              </div>
            </div>
          </div>
        </section>

        {/* DYNAMIC LIVE EVENTS SECTION */}
        <section id="events" className="py-[100px] border-t border-white/10">
          <div className="max-w-[850px] mb-[42px]">
            <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
              Live Experiences
            </div>
            <h2 className="text-[clamp(34px,5vw,60px)] leading-[1.04] tracking-[-0.045em] font-bold m-0 mb-[17px]">
              Upcoming Events
            </h2>
            <p className="text-[#aab7c1] text-[17px]">
              Live-streaming and ticketed entertainment.
            </p>
          </div>

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
                    {event.image_url || event.poster_url ? (
                      <div className="h-48 bg-black rounded-lg overflow-hidden mb-4">
                        <img 
                          src={event.image_url || event.poster_url} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <p className="text-[#67e3c5] font-semibold mb-4">
                      ₦{event.price ? event.price.toLocaleString() : 'Free'}
                    </p>
                  </div>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-block bg-[#67e3c5] text-[#06100f] text-center font-extrabold py-2 px-4 rounded-lg hover:bg-[#52d2b3] transition"
                  >
                    Get Ticket / Watch
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* How It Works */}
        <section id="how" className="py-[100px] border-t border-white/10">
          <div className="max-w-[850px] mb-[42px]">
            <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
              How It Works
            </div>
            <h2 className="text-[clamp(34px,5vw,60px)] leading-[1.04] tracking-[-0.045em] font-bold m-0 mb-[17px]">
              Turn a live performance into a global ticketed event.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035]">
              <strong className="block text-[#67e3c5] text-[13px] mb-[10px]">01 · Create</strong>
              <h3 className="m-0 mb-2 text-[18px] font-bold">Set up your live event.</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Create the experience and prepare your audience.</p>
            </div>
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035]">
              <strong className="block text-[#67e3c5] text-[13px] mb-[10px]">02 · Set Your Price</strong>
              <h3 className="m-0 mb-2 text-[18px] font-bold">Choose ticket or PPV pricing.</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Decide what audiences pay for access.</p>
            </div>
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035]">
              <strong className="block text-[#67e3c5] text-[13px] mb-[10px]">03 · Go Live</strong>
              <h3 className="m-0 mb-2 text-[18px] font-bold">Perform from almost anywhere.</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Use a studio, private venue or home setup.</p>
            </div>
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035]">
              <strong className="block text-[#67e3c5] text-[13px] mb-[10px]">04 · Reach the World</strong>
              <h3 className="m-0 mb-2 text-[18px] font-bold">Fans watch from anywhere.</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Open the experience to audiences beyond the room.</p>
            </div>
          </div>
        </section>

        {/* Problem Comparison */}
        <section className="py-[100px] border-t border-white/10">
          <div className="max-w-[850px] mb-[42px]">
            <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
              The problem
            </div>
            <h2 className="text-[clamp(34px,5vw,60px)] leading-[1.04] tracking-[-0.045em] font-bold m-0 mb-[17px]">
              Physical venues have limits. Your audience shouldn't.
            </h2>
            <p className="text-[#aab7c1] text-[17px]">
              A stadium, hall or club can only hold a fixed number of people. That physical ceiling can limit ticket sales, audience reach and the economics of a live performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-[25px] border border-white/[0.08] rounded-[18px] bg-white/[0.035] min-h-[230px]">
              <h3 className="mt-0 text-[18px] font-bold">Today</h3>
              <p className="text-[#aab7c1] text-sm">Artist → Venue → Fixed seats → Physical audience → Limited capacity</p>
              <ul className="mt-[17px] pl-5 text-[#aab7c1] text-sm space-y-2 list-disc">
                <li>Limited by venue capacity</li>
                <li>Audience must travel</li>
                <li>Location restricts reach</li>
                <li>Large venues can be expensive</li>
              </ul>
            </div>
            <div className="p-[25px] border border-[rgba(103,227,197,0.25)] rounded-[18px] bg-gradient-to-br from-[rgba(103,227,197,0.08)] to-white/[0.025] min-h-[230px]">
              <h3 className="mt-0 text-[18px] font-bold">With Elqena</h3>
              <p className="text-[#aab7c1] text-sm">Artist → Studio / private venue / home → Elqena → Global paying audience</p>
              <ul className="mt-[17px] pl-5 text-[#aab7c1] text-sm space-y-2 list-disc">
                <li>Digital reach can extend beyond the room</li>
                <li>Fans can join from anywhere</li>
                <li>Artists can perform from a suitable location</li>
                <li>Ticketed access creates a digital revenue channel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Platform Cards */}
        <section id="platform" className="py-[100px] border-t border-white/10">
          <div className="max-w-[850px] mb-[42px]">
            <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
              The platform
            </div>
            <h2 className="text-[clamp(34px,5vw,60px)] leading-[1.04] tracking-[-0.045em] font-bold m-0 mb-[17px]">
              Everything needed to make live digital entertainment work.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px]">
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035] min-h-[190px]">
              <div className="text-[26px] mb-[15px] text-[#67e3c5]">🎥</div>
              <h3 className="text-[17px] font-bold mb-2">Go Live</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Deliver a professional live performance to a digital audience.</p>
            </div>
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035] min-h-[190px]">
              <div className="text-[26px] mb-[15px] text-[#67e3c5]">🎟️</div>
              <h3 className="text-[17px] font-bold mb-2">Sell Access</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Create ticketed or PPV experiences and set the price.</p>
            </div>
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035] min-h-[190px]">
              <div className="text-[26px] mb-[15px] text-[#67e3c5]">🌍</div>
              <h3 className="text-[17px] font-bold mb-2">Reach Globally</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Open performances to audiences beyond the physical venue.</p>
            </div>
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035] min-h-[190px]">
              <div className="text-[26px] mb-[15px] text-[#67e3c5]">💬</div>
              <h3 className="text-[17px] font-bold mb-2">Engage Live</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Give audiences ways to interact during the performance.</p>
            </div>
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035] min-h-[190px]">
              <div className="text-[26px] mb-[15px] text-[#67e3c5]">📊</div>
              <h3 className="text-[17px] font-bold mb-2">Understand Your Audience</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Track viewers, purchases and event performance.</p>
            </div>
            <div className="p-[25px] border border-white/10 rounded-[18px] bg-white/[0.035] min-h-[190px]">
              <div className="text-[26px] mb-[15px] text-[#67e3c5]">💰</div>
              <h3 className="text-[17px] font-bold mb-2">Monetise</h3>
              <p className="text-[#aab7c1] text-[14px] m-0">Build new revenue around live digital experiences.</p>
            </div>
          </div>
        </section>

        {/* Creator Flow */}
        <section className="py-[100px] border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-center">
            <div>
              <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
                For artists &amp; creators
              </div>
              <h2 className="text-[clamp(34px,5vw,60px)] leading-[1.04] tracking-[-0.045em] font-bold mb-4">
                Perform from your space. Let your audience come to you.
              </h2>
              <p className="text-[#aab7c1] text-base">
                Whether you're in a private studio, a production room or your home, Elqena is designed to turn the performance into a ticketed digital experience.
              </p>
              <div className="mt-[26px]">
                <a 
                  href="#contact" 
                  className="px-[21px] py-[13px] bg-[#67e3c5] text-[#06100f] font-extrabold text-[14px] rounded-[9px] hover:bg-[#52d2b3] transition inline-block"
                >
                  Partner With Elqena
                </a>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="p-[17px_18px] border border-white/10 rounded-[12px] bg-white/[0.025] font-bold flex justify-between items-center">
                <span>🎤 Artist prepares performance</span>
                <span className="text-[#67e3c5]">↓</span>
              </div>
              <div className="p-[17px_18px] border border-white/10 rounded-[12px] bg-white/[0.025] font-bold flex justify-between items-center">
                <span>🎟️ Audience purchases access</span>
                <span className="text-[#67e3c5]">↓</span>
              </div>
              <div className="p-[17px_18px] border border-white/10 rounded-[12px] bg-white/[0.025] font-bold flex justify-between items-center">
                <span>🔐 Elqena verifies entitlement</span>
                <span className="text-[#67e3c5]">↓</span>
              </div>
              <div className="p-[17px_18px] border border-white/10 rounded-[12px] bg-white/[0.025] font-bold flex justify-between items-center">
                <span>📺 Audience watches live</span>
                <span className="text-[#67e3c5]">↓</span>
              </div>
              <div className="p-[17px_18px] border border-white/10 rounded-[12px] bg-white/[0.025] font-bold">
                <span>💰 Event generates revenue</span>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-[100px] border-t border-white/10">
          <div className="max-w-[850px] mb-[42px]">
            <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
              The Team
            </div>
            <h2 className="text-[clamp(34px,5vw,60px)] leading-[1.04] tracking-[-0.045em] font-bold m-0 mb-[17px]">
              The people building Elqena.
            </h2>
            <p className="text-[#aab7c1] text-[17px]">
              A founding team combining business, technology, operations and entertainment-industry experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
            {/* Rabiu Bello */}
            <div className="border border-white/10 rounded-[18px] bg-white/[0.035] overflow-hidden min-h-[410px]">
              <div className="relative w-full h-[250px]">
                <img 
                  src="/rabiu.jpg" 
                  alt="Rabiu Bello" 
                  className="w-full h-full object-cover object-[center_25%]"
                />
              </div>
              <div className="p-[22px_22px_25px]">
                <h3 className="text-[18px] font-bold m-0">Rabiu Bello</h3>
                <div className="text-[#67e3c5] text-[12px] font-extrabold leading-[1.45] my-[5px] mb-[13px]">
                  Founder &amp; CEO
                </div>
                <p className="text-[#aab7c1] text-[13px] leading-[1.62] m-0">
                  Entrepreneur and digital business builder focused on company strategy, product direction, partnerships, growth and Elqena’s live digital infrastructure vision.
                </p>
              </div>
            </div>

            {/* Godwin Agbane */}
            <div className="border border-white/10 rounded-[18px] bg-white/[0.035] overflow-hidden min-h-[410px]">
              <div className="relative w-full h-[250px]">
                <img 
                  src="/godwin.jpg" 
                  alt="Godwin Agbane" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-[22px_22px_25px]">
                <h3 className="text-[18px] font-bold m-0">Godwin Agbane</h3>
                <div className="text-[#67e3c5] text-[12px] font-extrabold leading-[1.45] my-[5px] mb-[13px]">
                  Co-Founder &amp; CTO
                </div>
                <p className="text-[#aab7c1] text-[13px] leading-[1.62] m-0">
                  DevOps, SRE and Full-Stack Engineer leading Elqena’s technology, engineering, infrastructure, scalability and platform architecture.
                </p>
              </div>
            </div>

            {/* Mbasiti Julius Jesse */}
            <div className="border border-white/10 rounded-[18px] bg-white/[0.035] overflow-hidden min-h-[410px]">
              <div className="relative w-full h-[250px]">
                <img 
                  src="/mbasiti.jpg" 
                  alt="Mbasiti Julius Jesse" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-[22px_22px_25px]">
                <h3 className="text-[18px] font-bold m-0">Mbasiti Julius Jesse</h3>
                <div className="text-[#67e3c5] text-[12px] font-extrabold leading-[1.45] my-[5px] mb-[13px]">
                  Co-Founder &amp; COO
                </div>
                <p className="text-[#aab7c1] text-[13px] leading-[1.62] m-0">
                  Entrepreneur and media and entertainment professional leading operations, execution, partnerships and commercial development.
                </p>
              </div>
            </div>

            {/* Ajibogere Seyi */}
            <div className="border border-white/10 rounded-[18px] bg-white/[0.035] overflow-hidden min-h-[410px]">
              <div className="relative w-full h-[250px]">
                <img 
                  src="/seyi.jpg" 
                  alt="Ajibogere Seyi" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-[22px_22px_25px]">
                <h3 className="text-[18px] font-bold m-0">Ajibogere Seyi</h3>
                <div className="text-[#67e3c5] text-[12px] font-extrabold leading-[1.45] my-[5px] mb-[13px]">
                  Co-Founder &amp; Chief Entertainment Officer
                </div>
                <p className="text-[#aab7c1] text-[13px] leading-[1.62] m-0">
                  Entertainment executive and talent manager leading creator relationships, artist partnerships, entertainment strategy and industry development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunity Banner */}
        <section className="py-[100px] border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[55px] items-center">
            <div>
              <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
                The opportunity
              </div>
              <div className="text-[clamp(32px,4vw,50px)] leading-[1.08] tracking-[-0.04em] font-bold">
                Live entertainment without the walls.
              </div>
            </div>
            <div>
              <p className="text-[#aab7c1] mb-6">
                Elqena is building infrastructure that lets live performers create, sell and deliver digital experiences to audiences without making physical venue capacity the ceiling.
              </p>
              <a 
                href="#contact" 
                className="px-[21px] py-[13px] bg-[#67e3c5] text-[#06100f] font-extrabold text-[14px] rounded-[9px] hover:bg-[#52d2b3] transition inline-block"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Contact Box */}
        <section id="contact" className="py-[85px] border-t border-white/10">
          <div className="text-center p-8 md:p-[60px] border border-[rgba(103,227,197,0.25)] rounded-[26px] bg-[radial-gradient(circle_at_80%_20%,rgba(103,227,197,0.1),transparent_35%),rgba(255,255,255,0.035)]">
            <div className="text-[#67e3c5] text-[12px] font-extrabold tracking-[0.18em] uppercase mb-[18px]">
              Elqena · Abuja, Nigeria
            </div>
            <h2 className="text-[clamp(35px,5vw,60px)] leading-[1.04] tracking-[-0.045em] font-bold m-0">
              Let's build the future of live entertainment.
            </h2>
            <p className="text-[#aab7c1] max-w-[680px] mx-auto my-[18px] mb-[28px]">
              Elqena is currently developing its technology platform for scale. We are open to strategic partnerships, artists, creators, investors and ecosystem collaborators.
            </p>
            
            <div className="flex justify-center gap-3 flex-wrap my-5 mb-[30px]">
              <a href="tel:+2347037700658" className="p-[12px_17px] border border-white/10 rounded-[10px] bg-white/[0.025] hover:border-white/20 transition text-left">
                <small className="block text-[#aab7c1] text-[11px] uppercase tracking-[0.12em]">Call us</small>
                <strong className="text-[15px]">+234 703 770 0658</strong>
              </a>
              <a href="https://wa.me/2347037700658" target="_blank" rel="noopener noreferrer" className="p-[12px_17px] border border-[rgba(103,227,197,0.35)] rounded-[10px] bg-white/[0.025] hover:border-[#67e3c5] transition text-left">
                <small className="block text-[#aab7c1] text-[11px] uppercase tracking-[0.12em]">WhatsApp</small>
                <strong className="text-[15px]">Chat with Elqena →</strong>
              </a>
              <a href="mailto:hello@elqena.com" className="p-[12px_17px] border border-white/10 rounded-[10px] bg-white/[0.025] hover:border-white/20 transition text-left">
                <small className="block text-[#aab7c1] text-[11px] uppercase tracking-[0.12em]">Email</small>
                <strong className="text-[15px]">hello@elqena.com</strong>
              </a>
            </div>

            <div className="flex justify-center">
              <a href="mailto:hello@elqena.com" className="px-[21px] py-[13px] bg-[#67e3c5] text-[#06100f] font-extrabold text-[14px] rounded-[9px] hover:bg-[#52d2b3] transition">
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-7 pb-[45px] text-[#7f8d96] text-[13px] flex flex-col sm:flex-row justify-between gap-5">
          <span>© 2026 Elqena. All rights reserved.</span>
          <span>Live without boundaries.</span>
        </footer>
      </div>
    </div>
  );
}