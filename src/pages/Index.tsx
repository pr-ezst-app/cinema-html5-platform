import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const TMDB = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACK = 'https://image.tmdb.org/t/p/w1280';

const movies = [
  {
    id: 1,
    title: 'Interstellar',
    genre: 'Sci-Fi',
    year: 2014,
    rating: 8.7,
    duration: '2h 49m',
    img: `${TMDB}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
    backdrop: `${TMDB_BACK}/pbrkL804c8yAv3zBZR4QPEafpAR.jpg`,
    description: "Un groupe d'explorateurs utilise un tunnel spatio-temporel découvert dans le système solaire pour parcourir des distances interstellaires, en quête d'une nouvelle demeure pour l'humanité.",
    progress: 65,
    videoUrl: 'https://nakastream.tv/player?title=Interstellar&id=543&poster=/1pnigkWWy8W032o9TKDneBa3eVK.jpg&type=movie'
  },
  {
    id: 2,
    title: 'Inception',
    genre: 'Thriller',
    year: 2010,
    rating: 8.8,
    duration: '2h 28m',
    img: `${TMDB}/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg`,
    backdrop: `${TMDB_BACK}/s3TBrRGB1iav7gFOCNx3H31MoES.jpg`,
    description: "Un voleur qui s'immisce dans les rêves de ses cibles pour leur dérober leurs secrets se voit proposer une mission encore plus complexe : implanter une idée dans l'esprit de quelqu'un.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 3,
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    rating: 9.0,
    duration: '2h 32m',
    img: `${TMDB}/qJ2tW6WMUDux911r6m7haRef0WH.jpg`,
    backdrop: `${TMDB_BACK}/hkBaDkMWbLaf8B1lsWsqX7an5lu.jpg`,
    description: "Batman relève le plus grand défi de son existence avec l'aide du lieutenant Gordon et du procureur Harvey Dent lorsque le Joker, un criminel sadique et ingénieux, plonge Gotham City dans le chaos.",
    progress: 30,
    videoUrl: ''
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    genre: 'Crime',
    year: 1994,
    rating: 8.9,
    duration: '2h 34m',
    img: `${TMDB}/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg`,
    backdrop: `${TMDB_BACK}/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg`,
    description: "Los Angeles. Alors que Pumpkin et Honey Bunny braquent un restaurant, Jules et Vincent, deux tueurs à la solde de Marsellus Wallace, récupèrent une mallette pour leur patron.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 5,
    title: 'The Matrix',
    genre: 'Sci-Fi',
    year: 1999,
    rating: 8.7,
    duration: '2h 16m',
    img: `${TMDB}/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg`,
    backdrop: `${TMDB_BACK}/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg`,
    description: "Thomas Anderson mène une double vie : le jour il travaille dans une entreprise d'informatique, et la nuit il est un hacker qui se fait appeler Neo. Un homme nommé Morpheus lui révèle la vérité sur le monde.",
    progress: 88,
    videoUrl: ''
  },
  {
    id: 6,
    title: 'Parasite',
    genre: 'Drame',
    year: 2019,
    rating: 8.5,
    duration: '2h 12m',
    img: `${TMDB}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,
    backdrop: `${TMDB_BACK}/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg`,
    description: "Toute la famille de Ki-taek est au chômage. Elle s'intéresse à la richissime famille Park, quand leur fils Ki-woo est recommandé pour être tuteur en anglais de leur fille. Une opportunité qui va engendrer des événements inattendus.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 7,
    title: 'Fight Club',
    genre: 'Drame',
    year: 1999,
    rating: 8.8,
    duration: '2h 19m',
    img: `${TMDB}/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg`,
    backdrop: `${TMDB_BACK}/hZkgoQYus5vegHoetLkCJzb17zJ.jpg`,
    description: "Un employé de bureau insomniaque et dépressif rencontre un vendeur de savon charismatique nommé Tyler Durden. Ensemble, ils forment un club de combat clandestin.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 8,
    title: 'Gladiator',
    genre: 'Action',
    year: 2000,
    rating: 8.5,
    duration: '2h 35m',
    img: `${TMDB}/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg`,
    backdrop: `${TMDB_BACK}/6WBIzCgmDCYrqh64yDREGeDk9d3.jpg`,
    description: "Maximus est le général le plus respecté de Rome. Trahi et condamné à mort par Commode, fils de l'Empereur, il survit et devient gladiateur pour venger sa famille et son honneur.",
    progress: 0,
    videoUrl: ''
  },
];

const categories = [
  { name: 'Action & Aventure', icon: 'Zap', count: 248 },
  { name: 'Crime & Thriller', icon: 'Eye', count: 183 },
  { name: 'Science-Fiction', icon: 'Rocket', count: 312 },
  { name: 'Drame', icon: 'Heart', count: 421 },
  { name: 'Documentaire', icon: 'Film', count: 156 },
  { name: 'Horreur', icon: 'Ghost', count: 94 },
];

const defaultWatchlist = [1, 3, 5];

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

function isDirectVideo(url: string) {
  return /\.(mp4|webm|mkv|m3u8|ogg)(\?|$)/i.test(url);
}

function VideoPlayer({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  const isDirect = movie.videoUrl ? isDirectVideo(movie.videoUrl) : false;

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
    setCurrentTime(formatTime(v.currentTime));
  }

  function handleLoadedMetadata() {
    const v = videoRef.current;
    if (!v) return;
    setDuration(formatTime(v.duration));
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  }

  function fullscreen() {
    if (isDirect) {
      videoRef.current?.requestFullscreen();
    } else {
      iframeRef.current?.requestFullscreen();
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl px-4 relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-display text-2xl text-white">{movie.title}</span>
            <span className="ml-3 text-gray-500 text-sm">{movie.year} · {movie.duration}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 glass px-3 py-2 rounded-lg text-gray-300 hover:text-white text-sm transition-all"
          >
            <Icon name="X" size={14} />
            Fermer
          </button>
        </div>

        {/* Player */}
        <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(230,57,70,0.3)' }}>
          {!movie.videoUrl && (
            <div className="relative w-full bg-[#0d0d0d] flex items-center justify-center" style={{ minHeight: 420 }}>
              <img src={movie.backdrop || movie.img} alt={movie.title} className="absolute inset-0 w-full h-full object-cover opacity-25" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-full bg-[#e63946]/20 border border-[#e63946]/40 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Film" size={36} className="text-[#e63946]" />
                </div>
                <p className="text-white font-display text-2xl mb-2">{movie.title}</p>
                <p className="text-gray-400 text-sm">Aucune URL vidéo configurée</p>
              </div>
            </div>
          )}

          {movie.videoUrl && isDirect && (
            <div className="relative group">
              <video
                ref={videoRef}
                src={movie.videoUrl}
                className="w-full"
                style={{ maxHeight: '72vh', background: '#000' }}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-[#e63946]/80 flex items-center justify-center">
                  <Icon name={playing ? "Pause" : "Play"} size={24} className="text-white" />
                </div>
              </div>
            </div>
          )}

          {movie.videoUrl && !isDirect && (
            <iframe
              ref={iframeRef}
              src={movie.videoUrl}
              className="w-full border-0"
              style={{ height: '72vh', minHeight: 420 }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              title={movie.title}
            />
          )}
        </div>

        {/* Controls bar — only for direct MP4 */}
        {isDirect && movie.videoUrl && (
          <div className="mt-3 glass rounded-xl px-4 py-3">
            <div
              className="w-full h-2 bg-[#2a2a2a] rounded-full mb-3 cursor-pointer overflow-hidden"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-[#e63946] to-red-400 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="bg-[#e63946] hover:bg-red-400 text-white px-4 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
                >
                  <Icon name={playing ? "Pause" : "Play"} size={14} />
                  {playing ? 'Pause' : 'Play'}
                </button>
                <span className="text-gray-400 text-xs font-mono">{currentTime} / {duration}</span>
              </div>
              <button
                onClick={fullscreen}
                className="glass px-3 py-1.5 rounded-lg text-gray-300 hover:text-white text-sm flex items-center gap-2 transition-all"
              >
                <Icon name="Maximize" size={14} />
                Plein écran
              </button>
            </div>
          </div>
        )}

        {/* Fullscreen button for iframe */}
        {!isDirect && movie.videoUrl && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={fullscreen}
              className="glass px-4 py-2 rounded-lg text-gray-300 hover:text-white text-sm flex items-center gap-2 transition-all"
            >
              <Icon name="Maximize" size={14} />
              Plein écran
            </button>
          </div>
        )}
      </div>
    </div>
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
  const [activeTab, setActiveTab] = useState('Tous');
  const tabs = ['Tous', 'Films', 'Séries', 'Documentaires'];
  const hero = movies[0];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={hero.backdrop || hero.img} alt={hero.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-16">
          <div className="fade-in-up-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e63946]/20 border border-[#e63946]/40 text-[#e63946] text-xs font-semibold mb-4 uppercase tracking-widest">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#e63946]" />
              En Tendance
            </span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none mb-3 fade-in-up-2">
            {hero.title.split(' ').map((w, i) => (
              <span key={i}>{i === 0 ? w : <><br /><span className="text-[#e63946]">{w}</span></>}</span>
            ))}
          </h1>
          <p className="text-gray-300 text-base max-w-md mb-6 fade-in-up-3 font-light leading-relaxed line-clamp-2">
            {hero.description}
          </p>
          <div className="flex items-center gap-4 fade-in-up-4">
            <button
              className="flex items-center gap-2 bg-[#e63946] hover:bg-red-400 text-white font-semibold px-7 py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
              onClick={() => onMovieClick(hero)}
            >
              <Icon name="Play" size={18} />
              Regarder
            </button>
            <button
              className="flex items-center gap-2 glass text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-all"
              onClick={() => onToggleWatchlist(hero.id)}
            >
              <Icon name={watchlist.includes(hero.id) ? "BookmarkCheck" : "Plus"} size={18} />
              {watchlist.includes(hero.id) ? 'Sauvegardé' : 'Ma liste'}
            </button>
            <div className="hidden md:flex items-center gap-3 ml-4 text-sm text-gray-400">
              <StarRating rating={hero.rating} />
              <span>·</span>
              <span>{hero.genre}</span>
              <span>·</span>
              <span>{hero.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 md:px-16 mt-8">
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
              EN <span className="text-[#e63946]">TENDANCE</span>
            </h2>
            <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
              Voir tout <Icon name="ChevronRight" size={16} />
            </button>
          </div>
          <div className="scroll-row">
            {movies.map(m => (
              <MovieCard key={m.id} movie={m} onClick={() => onMovieClick(m)} inWatchlist={watchlist.includes(m.id)} onToggleWatchlist={onToggleWatchlist} />
            ))}
          </div>
        </section>

        {/* Continue Watching */}
        {movies.filter(m => m.progress > 0).length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-3xl text-white tracking-wide">
                CONTINUER <span className="text-[#e63946]">À REGARDER</span>
              </h2>
            </div>
            <div className="scroll-row">
              {movies.filter(m => m.progress > 0).map(m => (
                <MovieCard key={m.id} movie={m} onClick={() => onMovieClick(m)} inWatchlist={watchlist.includes(m.id)} onToggleWatchlist={onToggleWatchlist} />
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-3xl text-white tracking-wide">
              CATÉGORIES
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
                <div className="text-xs text-gray-500">{cat.count} titres</div>
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
        <h1 className="font-display text-5xl text-white mb-2">MA <span className="text-[#e63946]">LISTE</span></h1>
        <p className="text-gray-400">{wlMovies.length} titre{wlMovies.length !== 1 ? 's' : ''} sauvegardé{wlMovies.length !== 1 ? 's' : ''}</p>
      </div>

      {wlMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center fade-in-up">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
            <Icon name="Bookmark" size={32} className="text-gray-600" />
          </div>
          <h3 className="font-display text-3xl text-gray-400 mb-2">RIEN DE SAUVEGARDÉ</h3>
          <p className="text-gray-600 text-sm">Parcourez les titres et cliquez sur le signet pour les sauvegarder ici</p>
        </div>
      ) : (
        <>
          {wlMovies.filter(m => m.progress > 0).length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-2xl text-white mb-5 tracking-wide">EN <span className="text-[#e63946]">COURS</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {wlMovies.filter(m => m.progress > 0).map(m => (
                  <div key={m.id} className="space-y-2">
                    <MovieCard movie={m} onClick={() => onMovieClick(m)} inWatchlist={true} onToggleWatchlist={onToggleWatchlist} />
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${m.progress}%` }} />
                    </div>
                    <div className="text-xs text-gray-500">{m.progress}% visionné</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {wlMovies.filter(m => m.progress === 0).length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl text-white mb-5 tracking-wide">À <span className="text-[#e63946]">REGARDER</span></h2>
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
    { label: 'Heures vues', value: '347', icon: 'Clock' },
    { label: 'Films vus', value: '89', icon: 'Film' },
    { label: 'Ma liste', value: '24', icon: 'Bookmark' },
    { label: 'Avis', value: '12', icon: 'Star' },
  ];
  const genres = [
    { name: 'Sci-Fi', pct: 38 },
    { name: 'Thriller', pct: 27 },
    { name: 'Drame', pct: 20 },
    { name: 'Action', pct: 15 },
  ];
  const recentActivity = [
    { title: 'Interstellar', action: 'Visionné 65%', time: 'Il y a 2h', img: movies[0].img },
    { title: 'The Matrix', action: 'Terminé', time: 'Hier', img: movies[4].img },
    { title: 'The Dark Knight', action: 'Note : 9/10', time: 'Il y a 3 jours', img: movies[2].img },
  ];

  return (
    <div className="px-8 md:px-16 pt-10 pb-20">
      <div className="flex items-center gap-6 mb-10 fade-in-up">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e63946] to-red-800 flex items-center justify-center text-3xl font-display text-white">
            A
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0a0a0a]" />
        </div>
        <div>
          <h1 className="font-display text-4xl text-white leading-none">ALEX MORGAN</h1>
          <p className="text-gray-400 text-sm mt-1">Membre Premium · Depuis jan. 2023</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded bg-[#e63946]/20 border border-[#e63946]/30 text-[#e63946] text-xs font-semibold">PREMIUM</span>
          </div>
        </div>
        <button className="ml-auto glass px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
          <Icon name="Settings" size={14} />
          Modifier
        </button>
      </div>

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
        <div className="glass rounded-2xl p-6 fade-in-up-2">
          <h3 className="font-display text-2xl text-white mb-6 tracking-wide">MES <span className="text-[#e63946]">GENRES</span></h3>
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

        <div className="glass rounded-2xl p-6 fade-in-up-3">
          <h3 className="font-display text-2xl text-white mb-6 tracking-wide">ACTIVITÉ <span className="text-[#e63946]">RÉCENTE</span></h3>
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

        <div className="glass rounded-2xl p-6 fade-in-up-4 md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl text-white tracking-wide mb-1">ABONNEMENT <span className="text-[#e63946]">PREMIUM</span></h3>
              <p className="text-gray-400 text-sm">Prochain paiement : 20 juin 2026 · 14,99 €/mois</p>
            </div>
            <div className="flex gap-3">
              <button className="glass px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition-all">Gérer</button>
              <button className="bg-[#e63946] hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                Changer de plan
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
            {['4K Ultra HD', 'Téléchargements', 'Sans publicité'].map(f => (
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

function MovieModal({ movie, onClose, inWatchlist, onToggleWatchlist, onPlay }: {
  movie: Movie;
  onClose: () => void;
  inWatchlist: boolean;
  onToggleWatchlist: (id: number) => void;
  onPlay: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full md:max-w-2xl glass rounded-t-3xl md:rounded-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 md:h-64">
          <img src={movie.backdrop || movie.img} alt={movie.title} className="w-full h-full object-cover" />
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
          {/* Play overlay */}
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div className="w-14 h-14 rounded-full bg-[#e63946]/80 group-hover:bg-[#e63946] flex items-center justify-center transition-all hover:scale-110">
              <Icon name="Play" size={24} className="text-white" />
            </div>
          </button>
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
          <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">{movie.description}</p>
          <div className="flex gap-3">
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-[#e63946] hover:bg-red-400 text-white font-semibold py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              onClick={onPlay}
            >
              <Icon name="Play" size={18} />
              {movie.progress > 0 ? `Reprendre (${movie.progress}%)` : 'Regarder'}
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
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);

  const toggleWatchlist = (id: number) => {
    setWatchlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handlePlay = (movie: Movie) => {
    setSelectedMovie(null);
    setPlayingMovie(movie);
  };

  const navItems: { id: Page; icon: string; label: string }[] = [
    { id: 'home', icon: 'Home', label: 'Accueil' },
    { id: 'watchlist', icon: 'Bookmark', label: 'Ma liste' },
    { id: 'profile', icon: 'User', label: 'Profil' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5">
        <div className="flex items-center justify-between px-8 md:px-16 h-16">
          <div className="font-display text-2xl tracking-widest text-white">
            N<span className="text-[#e63946]">O</span>IR
          </div>
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
      {selectedMovie && !playingMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          inWatchlist={watchlist.includes(selectedMovie.id)}
          onToggleWatchlist={toggleWatchlist}
          onPlay={() => handlePlay(selectedMovie)}
        />
      )}

      {/* Video Player */}
      {playingMovie && (
        <VideoPlayer
          movie={playingMovie}
          onClose={() => setPlayingMovie(null)}
        />
      )}
    </div>
  );
}