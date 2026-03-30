import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const albums = await prisma.album.findMany({
  orderBy: {
    year: "desc", // newest first
  },
  include: {
    songs: true,
  },
});

    return NextResponse.json(albums);
  } catch (error) {
    console.error("GET /api/albums error:", error);
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newAlbum = await prisma.album.create({
      data: {
        title: body.title,
        performers: body.performers,
        year: body.year,
        singers: body.singers,
        writers: body.writers,
        length: body.length,
        amountOfSongs: body.amountOfSongs
          ? Number(body.amountOfSongs)
          : null,
        image: body.image || null,
      },
    });

    return NextResponse.json(newAlbum, { status: 201 });
  } catch (error) {
    console.error("POST /api/albums error:", error);
    return NextResponse.json(
      { error: "Failed to create album" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const updated = await prisma.album.update({
      where: { id: body.id },
      data: {
        title: body.title,
        performers: body.performers,
        year: body.year,
        singers: body.singers,
        writers: body.writers,
        length: body.length,
        amountOfSongs: body.amountOfSongs
          ? Number(body.amountOfSongs)
          : null,
        image: body.image || null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await prisma.album.delete({
      where: { id: body.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}