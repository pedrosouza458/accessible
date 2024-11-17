/*
  Warnings:

  - Added the required column `position` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT NOT NULL,
    "localization" TEXT NOT NULL,
    "position" TEXT NOT NULL
);
INSERT INTO "new_Business" ("description", "id", "localization", "logo", "name") SELECT "description", "id", "localization", "logo", "name" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
