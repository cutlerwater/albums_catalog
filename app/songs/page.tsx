"use client";

import { useEffect, useState } from "react";

export default function SongsPage() {
  const [songs, setSongs] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    performers: "",
    year: "",
    singers: "",
    writers: "",
    length: "",
    lyrics: "",
    albumId: "",
  });

  // ===== LOAD =====
  const fetchSongs = async () => {
    const res = await fetch("/api/songs");
    const data = await res.json();
    setSongs(data);
  };

  const fetchAlbums = async () => {
    const res = await fetch("/api/albums");
    const data = await res.json();
    setAlbums(data);
  };

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  // ===== CREATE =====
  const createSong = async () => {
    const res = await fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        albumId: form.albumId || null,
      }),
    });

    if (!res.ok) {
      console.error("Create failed");
      return;
    }

    setForm({
      title: "",
      performers: "",
      year: "",
      singers: "",
      writers: "",
      length: "",
      lyrics: "",
      albumId: "",
    });

    fetchSongs();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎵 Songs</h1>

      {/* FORM */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {["title", "performers", "year", "singers", "writers", "length", "lyrics"].map((key) => (
          <input
            key={key}
            placeholder={key}
            value={(form as any)[key]}
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
      </div>

      {/* ALBUM DROPDOWN */}
      <select
        value={form.albumId}
        onChange={(e) => setForm({ ...form, albumId: e.target.value })}
        className="border p-2 rounded mb-4"
      >
        <option value="">No Album</option>
        {albums.map((album) => (
          <option key={album.id} value={album.id}>
            {album.title}
          </option>
        ))}
      </select>

      <button
        onClick={createSong}
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
      >
        Add Song
      </button>

      {/* LIST */}
      <div className="space-y-4">
        {songs.map((song) => (
          <div key={song.id} className="border p-4 rounded">
            <h2 className="font-bold">{song.title}</h2>
            <p>{song.performers}</p>

            {song.album && (
              <p className="text-sm text-gray-500">
                Album: {song.album.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}