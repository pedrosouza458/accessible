/*
  Warnings:

  - You are about to drop the column `localization` on the `Business` table. All the data in the column will be lost.
  - Added the required column `city` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "position" TEXT NOT NULL
);
INSERT INTO "new_Business" ("description", "id", "logo", "name", "position") SELECT "description", "id", "logo", "name", "position" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
