"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    performers: "",
    year: "",
    singers: "",
    writers: "",
    length: "",
    image: "",  });

    

  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("year-desc");

  const [songs, setSongs] = useState<any[]>([]);
  const [songForm, setSongForm] = useState({
    title: "",
    performers: "",
    year: "",
    singers: "",
    writers: "",
    length: "",
    albumId: "",
  });
  const [editSongId, setEditSongId] = useState<string | null>(null);

  const fetchAlbums = async () => {
    try {
      const res = await fetch("/api/albums");

      if (!res.ok) {
        const text = await res.text();
        console.error("GET /api/albums failed:", text);
        return;
      }

      const data = await res.json();
      setAlbums(data);
    } catch (error) {
      console.error("fetchAlbums error:", error);
    }
  };

  

  const fetchSongs = async () => {
      try {
        const res = await fetch("/api/songs");

        if (!res.ok) {
          const text = await res.text();
          console.error("GET /api/songs failed:", text);
          return;
        }

        const data = await res.json();
        setSongs(data);
      } catch (error) {
        console.error("fetchSongs error:", error);
      }
    };

    useEffect(() => {
      fetchAlbums();
      fetchSongs();
    }, []);

    const saveSong = async () => {
    const method = editSongId ? "PUT" : "POST";
    const body = editSongId ? { id: editSongId, ...songForm } : songForm;

    const res = await fetch("/api/songs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Save song failed:", text);
      return;
    }

    setSongForm({
      title: "",
      performers: "",
      year: "",
      singers: "",
      writers: "",
      length: "",
      albumId: "",
    });

    setEditSongId(null);
    await fetchSongs();
    await fetchAlbums();
  };

  const startSongEdit = (song: any) => {
  setSongForm({
    title: song.title || "",
    performers: song.performers || "",
    year: song.year || "",
    singers: song.singers || "",
    writers: song.writers || "",
    length: song.length || "",
    albumId: song.albumId || "",
  });

  setEditSongId(song.id);
};

const deleteSong = async (id: string) => {
  const res = await fetch("/api/songs", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete song failed:", text);
    return;
  }

  await fetchSongs();
  await fetchAlbums();
};

const saveAlbum = async () => {
  const method = editId ? "PUT" : "POST";
  const body = editId ? { id: editId, ...form } : form;

  console.log("Saving album with body:", body);

  const res = await fetch("/api/albums", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Save failed:", text);
    return;
  }

  setForm({
    title: "",
    performers: "",
    year: "",
    singers: "",
    writers: "",
    length: "",
    image: "",
  });

  setEditId(null);
  await fetchAlbums();
};
    
 
  const deleteAlbum = async (id: string) => {
    const res = await fetch("/api/albums", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Delete failed:", text);
      return;
    }

    await fetchAlbums();
  };

  const startEdit = (album: any) => {
  setForm({
    title: album.title,
    performers: album.performers,
    year: album.year,
    singers: album.singers,
    writers: album.writers,
    length: album.length,
    image: album.image || "",
  });

  setEditId(album.id);
};

  const filtered = albums
  .filter((s: any) =>
    Object.values(s).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  )
  .sort((a: any, b: any) => {
    switch (sortBy) {
      case "year-desc":
        return (Number(b.year) || 0) - (Number(a.year) || 0);
      case "year-asc":
        return (Number(a.year) || 0) - (Number(b.year) || 0);
      case "title-asc":
        return String(a.title || "").localeCompare(String(b.title || ""));
      case "title-desc":
        return String(b.title || "").localeCompare(String(a.title || ""));
      case "performers-asc":
        return String(a.performers || "").localeCompare(String(b.performers || ""));
      case "performers-desc":
        return String(b.performers || "").localeCompare(String(a.performers || ""));
      default:
        return 0;
    }
  });

  

  return (
  <div className={dark ? "bg-blue-300 text-white min-h-screen" : "bg-gray-100 min-h-screen"}>
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🔥🎶 My Album Catalog</h1>

      <button
        onClick={() => setDark(!dark)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Dark Mode
      </button>

      <div className="mb-4">
        <div className="grid grid-cols-5 gap-2">
          {["title", "performers", "year", "singers", "writers", "length"].map((key) => (
            <input
              key={key}
              value={(form as any)[key]}
              placeholder={key}
              className="border p-2 rounded text-blue"
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
        </div>

        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();

              if (!res.ok) {
                console.error("Upload failed:", data);
                return;
              }

              setForm((prev) => ({ ...prev, image: data.url }));
            }}
          />

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-24 h-24 object-cover rounded mt-2"
            />
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={saveAlbum}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editId !== null ? "Update Album" : "Add Album"}
        </button>

        {editId !== null && (
          <button
            onClick={() => {
              setEditId(null);
              setForm({
                title: "",
                performers: "",
                year: "",
                singers: "",
                writers: "",
                length: "",
                image: "",
              });
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">🎵 Manage Songs</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {["title", "performers", "year", "singers", "writers", "length"].map((key) => (
            <input
              key={key}
              value={(songForm as any)[key]}
              placeholder={key}
              className="border p-2 rounded text-blue"
              onChange={(e) => setSongForm({ ...songForm, [key]: e.target.value })}
            />
          ))}

          <select
            value={songForm.albumId}
            onChange={(e) => setSongForm({ ...songForm, albumId: e.target.value })}
            className="border p-2 rounded text-blue"
          >
            <option value="">No Album</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={saveSong}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            {editSongId ? "Update Song" : "Add Song"}
          </button>

          {editSongId && (
            <button
              onClick={() => {
                setEditSongId(null);
                setSongForm({
                  title: "",
                  performers: "",
                  year: "",
                  singers: "",
                  writers: "",
                  length: "",
                  albumId: "",
                });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Search..."
          className="border p-2 w-full text-blue"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded text-blue"
        >
          <option value="year-desc">Year: Newest</option>
          <option value="year-asc">Year: Oldest</option>
          <option value="title-asc">Title: A-Z</option>
          <option value="title-desc">Title: Z-A</option>
          <option value="performers-asc">Artist: A-Z</option>
          <option value="performers-desc">Artist: Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filtered.map((album) => (
          <div
            key={album.id}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur p-4 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <Link href={`/albums/${album.id}`}>
              <div className="relative group cursor-pointer">
                {album.image ? (
                  <img
                    src={album.image}
                    className="w-full h-56 object-cover rounded-2xl"
                    alt={album.title}
                  />
                ) : (
                  <div className="w-full h-56 rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500 dark:text-gray-300">
                    No Cover
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-2xl">
                  <span className="text-white font-bold text-lg">View Album</span>
                </div>
              </div>

              <h2 className="font-bold text-lg mt-4 leading-tight">{album.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {album.performers}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                  {album.year} • {album.songs.length} songs
                </p>
            </Link>

            {album.songs && album.songs.length > 0 && (
              <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">Songs</p>
                {album.songs.map((song: any) => (
                  <div key={song.id} className="flex items-center justify-between gap-2 mb-2 rounded-xl px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <p className="text-sm">🎵 {song.title}</p>

                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startSongEdit(song);
                        }}
                        className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSong(song.id);
                        }}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => startEdit(album)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl shadow-sm transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteAlbum(album.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl shadow-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}