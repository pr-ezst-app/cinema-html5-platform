import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.ezst.app/projects/d8fde606-b525-4097-b42f-85a185750d88/files/7382f7f4-e82e-4f83-a9dc-f852af392f14.jpg';
const GRID_IMG = 'https://cdn.ezst.app/projects/d8fde606-b525-4097-b42f-85a185750d88/files/3f813d59-9a71-4a21-8458-a985737272f6.jpg';
const SCIFI_IMG = 'https://cdn.ezst.app/projects/d8fde606-b525-4097-b42f-85a185750d88/files/4734d4eb-2279-4bc7-9d70-f29e35f9cecf.jpg';

const movies = [
  { id: 1, title: 'Eclipse Protocol', genre: 'Sci-Fi', year: 2024, rating: 8.4, duration: '2h 18m', img: SCIFI_IMG, progress: 65 },
  { id: 2, title: 'The Last Signal', genre: 'Thriller', year: 2024, rating: 7.9, duration: '1h 52m', img: HERO_IMG, progress: 0 },
  { id: 3, title: 'Noir City', genre: 'Crime', year: 2023, rating: 8.1, duration: '2h 05m', img: GRID_IMG, progress: 30 },
  { id: 4, title: 'Crimson Tide', genre: 'Drama', year: 2024, rating: 7.6, duration: '1h 48m', img: SCIFI_IMG, progress: 0 },
  { id: 5, title: 'Deep Horizon', genre: 'Action', year: 2024, rating: 8.8, duration: '2h 31m', img: HERO_IMG, progress: 0 },
  { id: 6, title: 'Ghost Protocol', genre: 'Spy', year: 2023, rating: 7.3, duration: '2h 12m', img: GRID_IMG, progress: 88 },
  { id: 7, title: 'Shadowlands', genre: 'Mystery', year: 2024, rating: 8.2, duration: '1h 59m', img: SCIFI_IMG, progress: 0 },
  { id: 8, title: 'Neon Requiem', genre: 'Drama', year: 2024, rating: 7.8, duration: '2h 02m', img: HERO_IMG, progress: 0 },
];

const categories = [
  { name: 'Action & Adventure', icon: 'Zap', count: 248 },
  { name: 'Crime & Thriller', icon: 'Eye', count: 183 },
  { name: 'Sci-Fi & Fantasy', icon: 'Rocket', count: 312 },
  { name: 'Drama', icon: 'Heart', count: 421 },
  { name: 'Documentary', icon: 'Film', count: 156 },
  { name: 'Horror', icon: 'Ghost', count: 94 },
];

const defaultWatchlist = [1, 3, 5, 6];

type Page = 'home' | 'watchlist' | 'profile';
type Movie = typeof movies[0];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
      <Icon name="Star" size={12} />
      {rating}
    </span>
  );
}

function MovieCard({ movie, onClick, inWatchlist, onToggleWatchlist }: {
  movie: Movie;
  onClick: () => void;
  inWatchlist: boolean;
  onToggleWatchlist: (id: number) => void;
}) {
  return (
    <div
      className="card-hover relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ width: 200, height: 290 }}
      onClick={onClick}
    >
      <img src={movie.img} alt={movie.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {movie.progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
          <div className="h-full bg-[#e63946]" style={{ width: `${movie.progress}%` }} />
        </div>
      )}

      <button
        className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
        onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
      >
        <Icon name={inWatchlist ? "BookmarkCheck" : "Bookmark"} size={14} className={inWatchlist ? "text-[#e63946]" : "text-white"} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="text-xs text-gray-400 mb-1">{movie.genre} · {movie.year}</div>
        <div className="font-display text-xl leading-none text-white mb-2">{movie.title}</div>
        <div className="flex items-center justify-between">
          <StarRating rating={movie.rating} />
          <span className="text-xs text-gray-400">{movie.duration}</span>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onMovieClick, watchlist, onToggleWatchlist }: {
  onMovieClick: (movie: Movie) => void;
  watchlist: number[];
  onToggleWatchlist: (id: number) => void;
}) {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Movies', 'Series', 'Documentaries'];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-16">
          <div className="fade-in-up-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e63946]/20 border border-[#e63946]/40 text-[#e63946] text-xs font-semibold mb-4 uppercase tracking-widest">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#e63946]" />
              Now Trending
            </span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none mb-3 fade-in-up-2">
            ECLIPSE<br /><span className="text-[#e63946]">PROTOCOL</span>
          </h1>
          <p className="text-gray-300 text-base max-w-md mb-6 fade-in-up-3 font-light leading-relaxed">
            In 2089, humanity's last satellite network is breached. One engineer holds the key to survival — or extinction.
          </p>
          <div className="flex items-center gap-4 fade-in-up-4">
            <button className="flex items-center gap-2 bg-[#e63946] hover:bg-red-400 text-white font-semibold px-7 py-3 rounded-lg transition-all hover:scale-105 active:scale-95">
              <Icon name="Play" size={18} />
              Watch Now
            </button>
            <button className="flex items-center gap-2 glass text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-all">
              <Icon name="Plus" size={18} />
              Watchlist
            </button>
            <div className="hidden md:flex items-center gap-3 ml-4 text-sm text-gray-400">
              <StarRating rating={8.4} />
              <span>·</span>
              <span>Sci-Fi</span>
              <span>·</span>
              <span>2h 18m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 md:px-16 mt-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a1a1a] p-1 rounded-xl w-fit mb-8">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t ? 'bg-[#e63946] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Trending */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-3xl text-white tracking-wide">
              TRENDING <span className="text-[#e63946]">NOW</span>
            </h2>
            <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
              See all <Icon name="ChevronRight" size={16} />
            </button>
          </div>
          <div className="scroll-row">
            {movies.map(m => (
              <MovieCard key={m.id} movie={m} onClick={() => onMovieClick(m)} inWatchlist={watchlist.includes(m.id)} onToggleWatchlist={onToggleWatchlist} />
            ))}
          </div>
        </section>

        {/* Continue Watching */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-3xl text-white tracking-wide">
              CONTINUE <span className="text-[#e63946]">WATCHING</span>
            </h2>
          </div>
          <div className="scroll-row">
            {movies.filter(m => m.progress > 0).map(m => (
              <MovieCard key={m.id} movie={m} onClick={() => onMovieClick(m)} inWatchlist={watchlist.includes(m.id)} onToggleWatchlist={onToggleWatchlist} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-3xl text-white tracking-wide">
              BROWSE <span className="text-[#e63946]">CATEGORIES</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(cat => (
              <button
                key={cat.name}
                className="glass rounded-xl p-5 text-left hover:bg-[#e63946]/10 hover:border-[#e63946]/30 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-[#e63946]/15 flex items-center justify-center mb-3 group-hover:bg-[#e63946]/30 transition-all">
                  <Icon name={cat.icon} size={20} className="text-[#e63946]" fallback="Film" />
                </div>
                <div className="font-semibold text-white text-sm leading-tight mb-1">{cat.name}</div>
                <div className="text-xs text-gray-500">{cat.count} titles</div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function WatchlistPage({ watchlist, onMovieClick, onToggleWatchlist }: {
  watchlist: number[];
  onMovieClick: (movie: Movie) => void;
  onToggleWatchlist: (id: number) => void;
}) {
  const wlMovies = movies.filter(m => watchlist.includes(m.id));

  return (
    <div className="px-8 md:px-16 pt-10 pb-20">
      <div className="mb-8 fade-in-up">
        <h1 className="font-display text-5xl text-white mb-2">MY <span className="text-[#e63946]">WATCHLIST</span></h1>
        <p className="text-gray-400">{wlMovies.length} titles saved</p>
      </div>

      {wlMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center fade-in-up">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
            <Icon name="Bookmark" size={32} className="text-gray-600" />
          </div>
          <h3 className="font-display text-3xl text-gray-400 mb-2">NOTHING SAVED YET</h3>
          <p className="text-gray-600 text-sm">Browse titles and click the bookmark icon to save them here</p>
        </div>
      ) : (
        <>
          {wlMovies.filter(m => m.progress > 0).length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-2xl text-white mb-5 tracking-wide">IN <span className="text-[#e63946]">PROGRESS</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {wlMovies.filter(m => m.progress > 0).map(m => (
                  <div key={m.id} className="space-y-2">
                    <MovieCard movie={m} onClick={() => onMovieClick(m)} inWatchlist={true} onToggleWatchlist={onToggleWatchlist} />
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${m.progress}%` }} />
                    </div>
                    <div className="text-xs text-gray-500">{m.progress}% watched</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {wlMovies.filter(m => m.progress === 0).length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl text-white mb-5 tracking-wide">SAVED TO <span className="text-[#e63946]">WATCH</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {wlMovies.filter(m => m.progress === 0).map(m => (
                  <MovieCard key={m.id} movie={m} onClick={() => onMovieClick(m)} inWatchlist={true} onToggleWatchlist={onToggleWatchlist} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function ProfilePage() {
  const stats = [
    { label: 'Hours Watched', value: '347', icon: 'Clock' },
    { label: 'Titles Seen', value: '89', icon: 'Film' },
    { label: 'Watchlist', value: '24', icon: 'Bookmark' },
    { label: 'Reviews', value: '12', icon: 'Star' },
  ];
  const genres = [
    { name: 'Sci-Fi', pct: 38 },
    { name: 'Thriller', pct: 27 },
    { name: 'Drama', pct: 20 },
    { name: 'Action', pct: 15 },
  ];
  const recentActivity = [
    { title: 'Eclipse Protocol', action: 'Watched 65%', time: '2 hours ago', img: SCIFI_IMG },
    { title: 'Ghost Protocol', action: 'Completed', time: 'Yesterday', img: GRID_IMG },
    { title: 'Noir City', action: 'Rated 8/10', time: '3 days ago', img: HERO_IMG },
  ];

  return (
    <div className="px-8 md:px-16 pt-10 pb-20">
      {/* Header */}
      <div className="flex items-center gap-6 mb-10 fade-in-up">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e63946] to-red-800 flex items-center justify-center text-3xl font-display text-white">
            A
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0a0a0a]" />
        </div>
        <div>
          <h1 className="font-display text-4xl text-white leading-none">ALEX MORGAN</h1>
          <p className="text-gray-400 text-sm mt-1">Premium Member · Joined Jan 2023</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded bg-[#e63946]/20 border border-[#e63946]/30 text-[#e63946] text-xs font-semibold">PREMIUM</span>
          </div>
        </div>
        <button className="ml-auto glass px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
          <Icon name="Settings" size={14} />
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 fade-in-up-1">
        {stats.map(s => (
          <div key={s.label} className="glass rounded-xl p-5 text-center">
            <div className="w-10 h-10 rounded-lg bg-[#e63946]/15 flex items-center justify-center mx-auto mb-3">
              <Icon name={s.icon} size={20} className="text-[#e63946]" fallback="Film" />
            </div>
            <div className="font-display text-4xl text-white">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Genre Taste */}
        <div className="glass rounded-2xl p-6 fade-in-up-2">
          <h3 className="font-display text-2xl text-white mb-6 tracking-wide">GENRE <span className="text-[#e63946]">TASTE</span></h3>
          <div className="space-y-4">
            {genres.map(g => (
              <div key={g.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300 font-medium">{g.name}</span>
                  <span className="text-gray-500">{g.pct}%</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill h-2" style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-2xl p-6 fade-in-up-3">
          <h3 className="font-display text-2xl text-white mb-6 tracking-wide">RECENT <span className="text-[#e63946]">ACTIVITY</span></h3>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src={item.img} alt={item.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.action}</div>
                </div>
                <div className="text-gray-600 text-xs flex-shrink-0">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="glass rounded-2xl p-6 fade-in-up-4 md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl text-white tracking-wide mb-1">PREMIUM <span className="text-[#e63946]">PLAN</span></h3>
              <p className="text-gray-400 text-sm">Next billing: June 20, 2026 · $14.99/month</p>
            </div>
            <div className="flex gap-3">
              <button className="glass px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition-all">Manage</button>
              <button className="bg-[#e63946] hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                Upgrade Plan
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
            {['4K Ultra HD', 'Offline Downloads', 'No Ads'].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                <Icon name="Check" size={14} className="text-[#e63946]" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieModal({ movie, onClose, inWatchlist, onToggleWatchlist }: {
  movie: Movie;
  onClose: () => void;
  inWatchlist: boolean;
  onToggleWatchlist: (id: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full md:max-w-2xl glass rounded-t-3xl md:rounded-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 md:h-72">
          <img src={movie.img} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all"
            onClick={onClose}
          >
            <Icon name="X" size={16} />
          </button>
          {movie.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="h-1 bg-black/40">
                <div className="h-full bg-[#e63946]" style={{ width: `${movie.progress}%` }} />
              </div>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-display text-4xl text-white leading-none">{movie.title}</h2>
            <StarRating rating={movie.rating} />
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
            <span className="px-2 py-0.5 rounded bg-[#1a1a1a] text-gray-300">{movie.genre}</span>
            <span>{movie.year}</span>
            <span>·</span>
            <span>{movie.duration}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            A gripping cinematic experience that pushes the limits of storytelling. Masterfully crafted with stunning visuals and an unforgettable score.
          </p>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#e63946] hover:bg-red-400 text-white font-semibold py-3 rounded-xl transition-all hover:scale-105 active:scale-95">
              <Icon name="Play" size={18} />
              {movie.progress > 0 ? `Resume (${movie.progress}%)` : 'Play Now'}
            </button>
            <button
              className={`w-14 flex items-center justify-center rounded-xl border transition-all ${inWatchlist ? 'border-[#e63946] bg-[#e63946]/10 text-[#e63946]' : 'border-white/10 glass text-gray-300 hover:text-white'}`}
              onClick={() => onToggleWatchlist(movie.id)}
            >
              <Icon name={inWatchlist ? "BookmarkCheck" : "Bookmark"} size={20} />
            </button>
            <button className="w-14 flex items-center justify-center rounded-xl glass text-gray-300 hover:text-white border border-white/10 transition-all">
              <Icon name="Share2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [watchlist, setWatchlist] = useState<number[]>(defaultWatchlist);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const toggleWatchlist = (id: number) => {
    setWatchlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const navItems: { id: Page; icon: string; label: string }[] = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'watchlist', icon: 'Bookmark', label: 'Watchlist' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5">
        <div className="flex items-center justify-between px-8 md:px-16 h-16">
          <div className="font-display text-2xl tracking-widest text-white">
            N<span className="text-[#e63946]">O</span>IR
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === item.id ? 'text-white bg-white/8' : 'text-gray-400 hover:text-white'}`}
              >
                <Icon name={item.icon} size={16} fallback="Circle" />
                {item.label}
                {page === item.id && (
                  <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#e63946]" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-all">
              <Icon name="Search" size={16} />
            </button>
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-all">
              <Icon name="Bell" size={16} />
            </button>
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e63946] to-red-800 flex items-center justify-center font-display text-white text-sm cursor-pointer"
              onClick={() => setPage('profile')}
            >
              A
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-16">
        {page === 'home' && (
          <HomePage onMovieClick={setSelectedMovie} watchlist={watchlist} onToggleWatchlist={toggleWatchlist} />
        )}
        {page === 'watchlist' && (
          <WatchlistPage watchlist={watchlist} onMovieClick={setSelectedMovie} onToggleWatchlist={toggleWatchlist} />
        )}
        {page === 'profile' && <ProfilePage />}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden glass border-t border-white/5 z-40">
        <div className="flex">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all ${page === item.id ? 'text-[#e63946]' : 'text-gray-500'}`}
            >
              <Icon name={item.icon} size={20} fallback="Circle" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          inWatchlist={watchlist.includes(selectedMovie.id)}
          onToggleWatchlist={toggleWatchlist}
        />
      )}
    </div>
  );
}