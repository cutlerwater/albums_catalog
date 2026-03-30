import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "albums.json");

// ===== READ =====
function readAlbums() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// ===== WRITE =====
function writeAlbums(albums: any) {
  fs.writeFileSync(filePath, JSON.stringify(albums, null, 2));
}

// GET
export async function GET() {
  const albums = readAlbums();
  return NextResponse.json(albums);
}

// POST
export async function POST(req: Request) {
  const albums = readAlbums();
  const newAlbum = await req.json();

  albums.push(newAlbum);
  writeAlbums(albums);

  return NextResponse.json({ success: true });
}

// DELETE
export async function DELETE(req: Request) {
  const { index } = await req.json();
  const albums = readAlbums();

  albums.splice(index, 1);
  writeAlbums(albums);

  return NextResponse.json({ success: true });
}