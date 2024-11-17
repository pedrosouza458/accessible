/*
  Warnings:

  - Added the required column `email` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT,
    "pixText" TEXT,
    "pixKey" TEXT,
    "urgency" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Business" ("city", "createdAt", "description", "id", "logo", "name", "phone", "pixKey", "pixText", "position", "urgency") SELECT "city", "createdAt", "description", "id", "logo", "name", "phone", "pixKey", "pixText", "position", "urgency" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
