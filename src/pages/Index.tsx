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
    videoUrl: 'https://www.nakastream.tv/player?title=Inception&id=641&poster=/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg&type=movie'
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
    videoUrl: 'https://www.nakastream.tv/player?title=The%20Dark%20Knight%20%3A%20Le%20Chevalier%20noir&id=679&poster=/pyNXnq8QBWoK3b37RS6C3axwUOy.jpg&type=movie'
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
    videoUrl: 'https://www.nakastream.tv/player?title=Pulp%20Fiction&id=791&poster=/4TBdF7nFw2aKNM0gPOlDNq3v3se.jpg&type=movie'
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
    videoUrl: 'https://www.nakastream.tv/player?title=Matrix&id=551&poster=/pEoqbqtLc4CcwDUDqxmEDSWpWTZ.jpg&type=movie'
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
    videoUrl: 'https://www.nakastream.tv/player?title=Parasite&id=626&poster=/7hLSzZX2jROmEXz2aEoh6JKUFy2.jpg&type=movie'
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
    videoUrl: 'https://www.nakastream.tv/player?title=Fight%20Club&id=1332&poster=/t1i10ptOivG4hV7erkX3tmKpiqm.jpg&type=movie'
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
    videoUrl: 'https://www.nakastream.tv/player?title=Gladiator&id=642&poster=/5gJOu3t2QrznuJqjCG7FQDMI76t.jpg&type=movie'
  },
  {
    id: 9,
    title: 'Avatar : De feu et de cendres',
    genre: 'Sci-Fi',
    year: 2025,
    rating: 7.5,
    duration: '2h 36m',
    img: 'https://fr.web.img6.acsta.net/img/52/fb/52fb8f0345af2b0940557aa049ca19fd.jpg',
    backdrop: 'https://fr.web.img6.acsta.net/img/52/fb/52fb8f0345af2b0940557aa049ca19fd.jpg',
    description: "Jake Sully et Neytiri font face à une nouvelle menace sur Pandora. Ils devront s'allier avec les peuples des volcans pour repousser les forces qui cherchent à détruire leur monde.",
    progress: 0,
    videoUrl: 'https://www.nakastream.tv/player?title=Avatar%20%3A%20De%20feu%20et%20de%20cendres&id=1374&poster=/5eATVqK2WVQi0D3wjzM5OP8EqZv.jpg&type=movie'
  },
  {
    id: 10,
    title: 'Le Seigneur des Anneaux : La Communauté de l\'Anneau',
    genre: 'Fantaisie',
    year: 2001,
    rating: 8.8,
    duration: '3h 28m',
    img: `${TMDB}/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg`,
    backdrop: `${TMDB_BACK}/pIkRyD18kl4FhoCNDZko2i68RwH.jpg`,
    description: "Dans un monde peuplé d'elfes, de nains et de hobbits, le jeune Frodon Sacquet hérite d'un anneau magique. Il devra entreprendre un long voyage pour détruire cet anneau maléfique.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 11,
    title: 'Forrest Gump',
    genre: 'Drame',
    year: 1994,
    rating: 8.8,
    duration: '2h 22m',
    img: `${TMDB}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,
    backdrop: `${TMDB_BACK}/qdIMHd4sEfJSckfVJfKQvisL02a.jpg`,
    description: "Forrest Gump, un homme simple d'Alabama, assiste malgré lui aux grands événements de l'histoire américaine des années 60 à 80, tout en cherchant son grand amour Jenny.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 12,
    title: 'Titanic',
    genre: 'Romance',
    year: 1997,
    rating: 7.9,
    duration: '3h 14m',
    img: `${TMDB}/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg`,
    backdrop: `${TMDB_BACK}/kHXEpyfl6zqn8a6YuozZUujufXf.jpg`,
    description: "En 1912, Rose, une jeune aristocrate, tombe amoureuse de Jack, un artiste sans le sou, à bord du Titanic, navire réputé insubmersible lors de son voyage inaugural.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 13,
    title: 'Le Lion de la montagne',
    genre: 'Animation',
    year: 1994,
    rating: 8.5,
    duration: '1h 28m',
    img: `${TMDB}/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg`,
    backdrop: `${TMDB_BACK}/wXsQvli6tWqja51pYxXNG1LFIGV.jpg`,
    description: "Simba, fils du roi des lions Mufasa, vit heureux dans la savane africaine jusqu'au jour où son oncle Scar le pousse à fuir en lui faisant croire qu'il est responsable de la mort de son père.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 14,
    title: 'Joker',
    genre: 'Drame',
    year: 2019,
    rating: 8.4,
    duration: '2h 02m',
    img: `${TMDB}/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg`,
    backdrop: `${TMDB_BACK}/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg`,
    description: "Arthur Fleck, un comédien raté qui aspire à faire rire, sombre dans la folie sous la pression d'une société cruelle. Sa descente aux enfers donnera naissance au Joker.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 15,
    title: 'Spider-Man : No Way Home',
    genre: 'Action',
    year: 2021,
    rating: 8.2,
    duration: '2h 28m',
    img: `${TMDB}/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg`,
    backdrop: `${TMDB_BACK}/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg`,
    description: "Peter Parker demande au Docteur Strange de lui rendre son anonymat. Le sort tourne mal et fait apparaître des super-vilains d'autres univers parallèles.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 16,
    title: 'Top Gun : Maverick',
    genre: 'Action',
    year: 2022,
    rating: 8.3,
    duration: '2h 10m',
    img: `${TMDB}/62HCnUTziyWcpDaBO2i1DX17ljH.jpg`,
    backdrop: `${TMDB_BACK}/qRf0qCni8NKoC7FjomOhlwSMhVP.jpg`,
    description: "Après plus de trente ans de service, Pete Mitchell est toujours là où il a toujours été : repousser les limites. Il est chargé de former une escouade de jeunes diplômés pour une mission périlleuse.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 17,
    title: 'Dune',
    genre: 'Sci-Fi',
    year: 2021,
    rating: 8.0,
    duration: '2h 35m',
    img: `${TMDB}/d5NXSklXo0qyIYkgV94XAgMIckC.jpg`,
    backdrop: `${TMDB_BACK}/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg`,
    description: "Paul Atreides, jeune homme brillant né pour un destin hors du commun, doit voyager sur la planète Arrakis, la plus dangereuse de l'univers, pour assurer l'avenir de sa famille et de son peuple.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 18,
    title: 'Avengers : Endgame',
    genre: 'Action',
    year: 2019,
    rating: 8.4,
    duration: '3h 01m',
    img: `${TMDB}/or06FN3Dka5tukK1e9sl16pB3iy.jpg`,
    backdrop: `${TMDB_BACK}/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg`,
    description: "Les Avengers survivants s'unissent une dernière fois pour tenter de renverser les actions dévastatrices de Thanos et restaurer l'équilibre de l'univers.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 19,
    title: 'Shutter Island',
    genre: 'Thriller',
    year: 2010,
    rating: 8.1,
    duration: '2h 18m',
    img: `${TMDB}/kfYHm9SBWrCqxcXKhAOT7NbGKlI.jpg`,
    backdrop: `${TMDB_BACK}/5b8ntYkNs3Aw4eqnmefUfAsFfVB.jpg`,
    description: "En 1954, deux marshals fédéraux se rendent sur Shutter Island pour enquêter sur la disparition d'une patiente dans un hôpital psychiatrique de haute sécurité.",
    progress: 0,
    videoUrl: ''
  },
  {
    id: 20,
    title: 'Le Silence des Agneaux',
    genre: 'Thriller',
    year: 1991,
    rating: 8.6,
    duration: '1h 58m',
    img: `${TMDB}/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg`,
    backdrop: `${TMDB_BACK}/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg`,
    description: "La jeune stagiaire du FBI Clarice Starling doit faire appel au génie criminel du Dr Hannibal Lecter pour attraper un tueur en série qui écorche ses victimes.",
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
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    const el = isDirect ? videoRef.current : playerContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {
        window.open(movie.videoUrl, '_blank');
      });
    } else {
      document.exitFullscreen();
    }
  }

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

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
            <div ref={playerContainerRef} className="relative w-full" style={{ height: '72vh', minHeight: 420, background: '#000' }}>
              <iframe
                ref={iframeRef}
                src={movie.videoUrl}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                title={movie.title}
              />
            </div>
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
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={14} />
                {isFullscreen ? 'Quitter' : 'Plein écran'}
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
              <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={14} />
              {isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleWatchlist = (id: number) => {
    setWatchlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handlePlay = (movie: Movie) => {
    setSelectedMovie(null);
    setPlayingMovie(movie);
  };

  const handleMovieClick = (movie: Movie) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedMovie(movie);
  };

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 50);
  };

  const searchResults = searchQuery.trim().length > 0
    ? movies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => { setPage('home'); setSearchOpen(false); }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#e63946] flex items-center justify-center">
              <Icon name="Film" size={16} className="text-white" />
            </div>
            <span className="font-display text-xl tracking-widest text-white">
              ÉCO<span className="text-[#e63946]">FILM</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setSearchOpen(false); }}
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
            <button
              onClick={openSearch}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-all"
            >
              <Icon name="Search" size={16} />
            </button>
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e63946] to-red-800 flex items-center justify-center font-display text-white text-sm cursor-pointer"
              onClick={() => { setPage('profile'); setSearchOpen(false); }}
            >
              A
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center pt-24 px-4">
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3 glass rounded-2xl px-5 py-3 mb-4 border border-white/10">
              <Icon name="Search" size={18} className="text-gray-400" />
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher un film, un genre..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                <Icon name="X" size={18} className="text-gray-400 hover:text-white transition-colors" />
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="glass rounded-2xl overflow-hidden border border-white/10">
                {searchResults.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => handleMovieClick(m)}
                    className={`w-full flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-all text-left ${i > 0 ? 'border-t border-white/5' : ''}`}
                  >
                    <img src={m.img} alt={m.title} className="w-10 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">{m.title}</div>
                      <div className="text-gray-400 text-sm">{m.genre} · {m.year}</div>
                    </div>
                    <Icon name="Play" size={16} className="text-[#e63946] ml-auto" />
                  </button>
                ))}
              </div>
            )}
            {searchQuery.trim().length > 0 && searchResults.length === 0 && (
              <div className="text-center text-gray-500 mt-8">Aucun résultat pour « {searchQuery} »</div>
            )}
          </div>
        </div>
      )}

      <main className="pt-16">
        {page === 'home' && (
          <HomePage onMovieClick={handleMovieClick} watchlist={watchlist} onToggleWatchlist={toggleWatchlist} />
        )}
        {page === 'watchlist' && (
          <WatchlistPage watchlist={watchlist} onMovieClick={handleMovieClick} onToggleWatchlist={toggleWatchlist} />
        )}
        {page === 'profile' && <ProfilePage />}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden glass border-t border-white/5 z-40">
        <div className="flex">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setSearchOpen(false); }}
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