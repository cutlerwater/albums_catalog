import Link from "next/link";
import { prisma } from "../../../lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AlbumDetailPage({ params }: Props) {
  const { id } = await params;

  const album = await prisma.album.findUnique({
    where: { id },
    include: {
      songs: true,
    },
  });

  if (!album) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Album Not Found</h1>
        <Link href="/" className="text-blue-500 underline">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <Link href="/" className="text-blue-500 underline mb-6 inline-block">
        ← Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          {album.image ? (
            <img
              src={album.image}
              alt={album.title}
              className="w-full max-w-sm rounded-2xl shadow-lg object-cover"
            />
          ) : (
            <div className="w-full max-w-sm h-80 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-500">
              No Cover
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{album.title}</h1>
          <p className="text-lg text-gray-600 mb-2">{album.performers}</p>
          <p className="text-sm text-gray-500 mb-6">
            {album.year || "Unknown Year"}
          </p>

          <div className="space-y-2 mb-6">
            <p><strong>Singers:</strong> {album.singers || "—"}</p>
            <p><strong>Writers:</strong> {album.writers || "—"}</p>
            <p><strong>Length:</strong> {album.length || "—"}</p>
            <p><strong>Total Songs:</strong> {album.songs?.length || 0}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-2xl font-semibold mb-4">Songs</h2>

            {album.songs && album.songs.length > 0 ? (
              <div className="space-y-2">
                {album.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">
                        {index + 1}. {song.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {song.performers || album.performers}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {song.length || ""}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No songs in this album yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}