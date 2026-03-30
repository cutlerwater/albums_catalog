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
    amountofsongs: "",
    image: ""   
  });

  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // ===== LOAD =====
  const fetchAlbums = async () => {
    const res = await fetch("/api/albums");
    const data = await res.json();
    setAlbums(data);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  // ===== ADD / UPDATE =====
  const saveAlbum = async () => {
    if (editIndex !== null) {
      await fetch("/api/albums", {
        method: "PUT",
        body: JSON.stringify({
          index: editIndex,
          updatedAlbum: form
        })
      });
      setEditIndex(null);
    } else {
      await fetch("/api/albums", {
        method: "POST",
        body: JSON.stringify(form)
      });
    }

    setForm({
    title: "",
    performers: "",
    year: "",
    singers: "",
    writers: "",
    length: "",
    amountofsongs: "",
    image: "" 
    });

    fetchAlbums();
  };

  // ===== DELETE =====
  const deleteAlbum = async (index: number) => {
    await fetch("/api/albums", {
      method: "DELETE",
      body: JSON.stringify({ index })
    });
    fetchAlbums();
  };

  // ===== START EDIT =====
  const startEdit = (index: number) => {
    const album = albums[index];

    setForm({
      title: album.title,
      performers: album.performers,
      year: album.year,
      singers: album.singers,
      writers: album.writers,
      length: album.length,
      amountofsongs: album.amountofsongs,
      image: album.image || ""
    });

    setEditIndex(index);
  };

  // ===== SEARCH FILTER =====
  const filtered = albums.filter((s: any) =>
    Object.values(s).some(v =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className={dark ? "bg-gray-900 text-white min-h-screen p-6" : "p-6"}>

      <h1 className="text-3xl font-bold mb-4">🔥🎶 My Album Catalog</h1>

      {/* DARK MODE */}
      <button
        onClick={() => setDark(!dark)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Dark Mode
      </button>

      {/* FORM */}
      <div className="mb-4">

  {/* TEXT INPUTS */}
  <div className="grid grid-cols-5 gap-2">
    {["title","performers","year","singers","writers","length", "amountofsongs"].map((key) => (
      <input
        key={key}
        value={(form as any)[key]}
        placeholder={key}
        className="border p-2 rounded text-blue"
        onChange={(e) =>
          setForm({ ...form, [key]: e.target.value })
        }
      />
    ))}
  </div>

  {/* 🖼️ FILE UPLOAD GOES RIGHT HERE */}
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
          body: formData
        });

        const data = await res.json();

        setForm({ ...form, image: data.url });
      }}
    />

    {/* 👀 PREVIEW */}
    {form.image && (
    <img
      src={form.image}
      alt="preview"
      className="w-24 h-24 object-cover rounded mt-2"
    />
  )}
  </div>

</div>

      {/* SAVE BUTTON */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={saveAlbum}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editIndex !== null ? "Update Album" : "Add Album"}
        </button>

        {/* CANCEL BUTTON */}
        {editIndex !== null && (
          <button
            onClick={() => {
              setEditIndex(null);
              setForm({
                    title: "",
                    performers: "",
                    year: "",
                    singers: "",
                    writers: "",
                    length: "",
                    amountofsongs: "",
                    image: "" 
              });
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        className="border p-2 w-full mb-4 text-blue"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filtered.map((album, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg hover:scale-105 transition transform"
          >
            {/* 🖼️ Album Art */}
            <div className="relative group">
              <img
                src={album.image || "/placeholder.png"}
                className="w-full h-40 object-cover rounded-lg"
              />

  {/* 🔥 HOVER OVERLAY */}
              <div className="absolute inset-0 bg-blue bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-lg">
                <span className="text-white font-bold text-lg">Edit</span>
              </div>
          </div>

            {/* 🎵 Info */}
            <h2 className="font-bold text-lg mt-3">{album.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {album.performers}
            </p>
            <p className="text-xs text-gray-400">{album.year} • {album.amountofsongs}</p>

            {/* 🎛️ Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => startEdit(i)}
                className="flex-1 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteAlbum(i)}
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