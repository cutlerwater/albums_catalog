import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-[#111111]/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4">
                    <div className="relative h-18 w-60 sm:h-22 sm:w-70">
                        <Image
                            src="/images/cutlerwaterlogo.png"
                            alt="Cutlerwater Album Catalog"
                            fill
                            className="object-contain drop-shadow-[0_10px_30px_rgba(255,180,0,0.15)] transition duration-300 group-hover:drop-shadow-[0_14px_40px_rgba(255,180,0,0.5)]"
                            sizes="(max-width: 768px) 180px, 250px"
                            priority
                        />
                    </div>
                </Link>

                    {/* Subtitle */}
                    <div className="hidden md:block">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                            Premium Music Directory
                        </p>
                        <p className="text-sm text-neutral-400">
                            Albums, artists, and collections
                        </p>
                    </div>
                

                {/* Nav */}
                <nav className="ml-auto hidden items-center gap-6 md:flex">
                    <Link href="/" className="text-sm font-semibold text-amber-400">
                        Home
                    </Link>
                    <Link href="/albums" className="text-sm text-neutral-300 hover:text-white">
                        Albums
                    </Link>
                    <Link href="/songs" className="text-sm text-neutral-300 hover:text-white">
                        Songs
                    </Link>
                </nav>

                {/* Search */}
                <div className="hidden lg:flex overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <input
                        type="text"
                        placeholder="Search albums, artists..."
                        className="w-64 bg-transparent px-5 py-2 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                    <button className="bg-amber-400 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-300">
                        Search
                    </button>
                </div>
            </div>
        </header>
    );
}