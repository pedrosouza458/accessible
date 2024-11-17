-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "position" TEXT
);
INSERT INTO "new_Business" ("city", "description", "id", "logo", "name", "position") SELECT "city", "description", "id", "logo", "name", "position" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
