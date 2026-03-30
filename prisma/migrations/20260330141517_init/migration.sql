-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "performers" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "singers" TEXT NOT NULL,
    "writers" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "amountOfSongs" INTEGER,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
