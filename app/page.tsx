"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchAlbums();
  }, []);

    const testCreateSong = async () => {
    const res = await fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Song",
        performers: "Test Artist",
        year: "2024",
        singers: "Test Singer",
        writers: "Test Writer",
        length: "3:45",
        albumId: null,
      }),
    });

    const data = await res.json();
    console.log("Created song:", data);
  };

  const saveAlbum = async () => {
    const method = editId ? "PUT" : "POST";

    const body = editId ? { id: editId, ...form } : form;

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

  const filtered = albums.filter((s: any) =>
    Object.values(s).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className={dark ? "bg-gray-900 text-white min-h-screen p-6" : "p-6"}>
      <h1 className="text-3xl font-bold mb-4">🔥🎶 My Album Catalog</h1>

      <button
        onClick={() => setDark(!dark)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Dark Mode
      </button>


      <div className="mb-4">
        <div className="grid grid-cols-5 gap-2">
          {[
            "title",
            "performers",
            "year",
            "singers",
            "writers",
            "length",
            ].map((key) => (
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

              setForm({ ...form, image: data.url });
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

      <input
        placeholder="Search..."
        className="border p-2 w-full mb-4 text-blue"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filtered.map((album) => (
          <div
            key={album.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg hover:scale-105 transition transform"
          >
            <div className="relative group">
              <img
                src={album.image || "/placeholder.png"}
                className="w-full h-40 object-cover rounded-lg"
                alt={album.title}
              />

              <div className="absolute inset-0 bg-blue bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-lg">
                <span className="text-white font-bold text-lg">Edit</span>
              </div>
            </div>

            <h2 className="font-bold text-lg mt-3">{album.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {album.performers}
            </p>
            <p className="text-xs text-gray-400">
              {album.year} • {album.songs.length} songs
            </p>

            {/* 👇 ADD THIS RIGHT HERE */}
            {album.songs && album.songs.length > 0 && (
              <div className="mt-3 border-t pt-2">
                <p className="text-xs text-gray-400 mb-1">Songs:</p>
                {album.songs.map((song: any) => (
                  <p key={song.id} className="text-sm">
                    🎵 {song.title}
                  </p>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => startEdit(album)}
                className="flex-1 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteAlbum(album.id)}
                className="flex-1 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}