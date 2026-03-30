/*
  Warnings:

  - You are about to drop the column `artist` on the `Song` table. All the data in the column will be lost.
  - Added the required column `performers` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `singers` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writers` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Made the column `length` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "performers" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "singers" TEXT NOT NULL,
    "writers" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "albumId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("albumId", "createdAt", "id", "length", "title") SELECT "albumId", "createdAt", "id", "length", "title" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
