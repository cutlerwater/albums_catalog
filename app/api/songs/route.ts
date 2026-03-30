import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const songs = await prisma.song.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        album: true,
      },
    });

    return NextResponse.json(songs);
  } catch (error) {
    console.error("GET /api/songs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newSong = await prisma.song.create({
      data: {
        title: body.title,
        performers: body.performers,
        year: body.year,
        singers: body.singers,
        writers: body.writers,
        length: body.length,
        albumId: body.albumId || null,
      },
      include: {
        album: true,
      },
    });

    return NextResponse.json(newSong, { status: 201 });
  } catch (error) {
    console.error("POST /api/songs error:", error);
    return NextResponse.json(
      { error: "Failed to create song" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const updatedSong = await prisma.song.update({
      where: { id: body.id },
      data: {
        title: body.title,
        performers: body.performers,
        year: body.year,
        singers: body.singers,
        writers: body.writers,
        length: body.length,
        albumId: body.albumId || null,
      },
      include: {
        album: true,
      },
    });

    return NextResponse.json(updatedSong);
  } catch (error) {
    console.error("PUT /api/songs error:", error);
    return NextResponse.json(
      { error: "Failed to update song" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await prisma.song.delete({
      where: { id: body.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/songs error:", error);
    return NextResponse.json(
      { error: "Failed to delete song" },
      { status: 500 }
    );
  }
}