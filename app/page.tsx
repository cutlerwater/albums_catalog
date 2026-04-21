import Image from "next/image";
import Link from "next/link";

type Album = {
  id: string | number;
  title: string;
  performers?: string;
  year?: string | number;
  image?: string;
  songs?: unknown[];
};

const albums: Album[] = [
  {
    id: 1,
    title: "Pulse",
    performers: "Pink Floyd",
    year: 1995,
    image: "/uploads/pulse.jpg",
    songs: new Array(26),
  },
  {
    id: 2,
    title: "Division Bell",
    performers: "Pink Floyd",
    year: 1994,
    image: "/uploads/division-bell.jpg",
    songs: new Array(11),
  },
  {
    id: 3,
    title: "Momentary Lapse of Reason",
    performers: "Pink Floyd",
    year: 1987,
    image: "/uploads/momentary-lapse.jpg",
    songs: new Array(10),
  },
  {
    id: 4,
    title: "The Final Cut",
    performers: "Pink Floyd",
    year: 1983,
    image: "/uploads/final-cut.jpg",
    songs: new Array(11),
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,180,0,0.12),transparent_45%,rgba(0,0,0,0.75))]" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
          {/* 🔥 BIG HERO LOGO */}
          <div className="relative mb-10 h-40 w-[500px] max-w-full sm:h-48 sm:w-[600px]">
            <Image
              src="/images/cutlerwaterlogo.png"
              alt="Cutlerwater Album Catalog"
              fill
              className="object-contain drop-shadow-[0_20px_60px_rgba(255,180,0,0.45)]"
              sizes="(max-width: 768px) 90vw, 600px"
              priority
            />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            Album and Song Catalog
          </p>

          <h2 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Discover albums, artists, and standout records.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">
            Browse your music collection in a premium catalog with album art,
            artist details, release years, and track listings.
          </p>

          <div className="mt-10 flex w-full max-w-4xl flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Search by album title, performer, singer, writer, or year..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#111111] px-5 py-4 text-base text-white placeholder:text-neutral-500 outline-none transition focus:border-amber-400/50"
            />
            <button className="rounded-2xl bg-amber-400 px-8 py-4 font-semibold text-black transition hover:bg-amber-300">
              Search
            </button>
          </div>

          <button className="mt-8 rounded-2xl bg-amber-400 px-8 py-4 font-semibold text-black transition hover:bg-amber-300">
            Browse Albums
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-900/25 to-[#151515] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                Refine Results
              </p>
              <p className="mt-2 text-sm text-neutral-400">
                Search, sort, and narrow albums by metadata.
              </p>
            </div>

            <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-neutral-300">
              {albums.length} albums
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input
              type="text"
              placeholder="Album title"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-neutral-500 outline-none"
            />
            <input
              type="text"
              placeholder="Performer"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-neutral-500 outline-none"
            />
            <input
              type="text"
              placeholder="Year"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-neutral-500 outline-none"
            />
            <select className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none">
              <option>Year: Newest</option>
              <option>Year: Oldest</option>
              <option>Title: A-Z</option>
              <option>Title: Z-A</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Featured Albums
            </p>
            <h3 className="mt-2 text-2xl font-bold">Browse the collection</h3>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album) => (
            <Link
              key={album.id}
              href={`/albums/${album.id}`}
              className="group rounded-[1.75rem] border border-white/10 bg-[#121212] p-4 transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-black/30">
                <Image
                  src={album.image || "/placeholder.png"}
                  alt={album.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />

                <button className="absolute bottom-3 right-3 rounded-full bg-amber-400 p-3 text-black opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                  ▶
                </button>
              </div>

              <h4 className="truncate text-lg font-semibold">{album.title}</h4>
              <p className="mt-1 text-sm text-neutral-400">{album.performers}</p>

              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
                  {album.year}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
                  {album.songs?.length ?? 0} songs
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-[#111111] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Manage Library
            </p>
            <h3 className="mt-2 text-2xl font-bold">Add albums and songs</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Keep your admin tools here instead of at the top of the page.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="mb-4 text-lg font-semibold">Add Album</h4>
              <div className="grid gap-3">
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Title" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Performers" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Year" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Singers" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Writers" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Length" />
                <button className="mt-2 rounded-xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300">
                  Add Album
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="mb-4 text-lg font-semibold">Add Song</h4>
              <div className="grid gap-3">
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Title" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Performers" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Year" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Singers" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Writers" />
                <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none" placeholder="Length" />
                <button className="mt-2 rounded-xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300">
                  Add Song
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
