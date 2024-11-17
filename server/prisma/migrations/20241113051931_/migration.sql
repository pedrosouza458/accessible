/*
  Warnings:

  - Added the required column `phone` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT,
    "pixText" TEXT DEFAULT 'pix_text',
    "pixKey" TEXT DEFAULT 'pix_key',
    "urgency" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Business" ("city", "createdAt", "description", "id", "logo", "name", "position") SELECT "city", "createdAt", "description", "id", "logo", "name", "position" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
