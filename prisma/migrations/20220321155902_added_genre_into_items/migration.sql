/*
  Warnings:

  - Added the required column `genre` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" BOOLEAN NOT NULL,
    "genre" TEXT NOT NULL
);
INSERT INTO "new_Item" ("Image", "id", "price", "stock", "title") SELECT "Image", "id", "price", "stock", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_title_key" ON "Item"("title");
CREATE UNIQUE INDEX "Item_Image_key" ON "Item"("Image");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
