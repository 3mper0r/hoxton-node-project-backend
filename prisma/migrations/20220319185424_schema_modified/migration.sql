/*
  Warnings:

  - You are about to drop the `_ItemToOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `price` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `itemId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ItemToOrder_B_index";

-- DropIndex
DROP INDEX "_ItemToOrder_AB_unique";

-- DropIndex
DROP INDEX "_ItemToUser_B_index";

-- DropIndex
DROP INDEX "_ItemToUser_AB_unique";

-- DropIndex
DROP INDEX "_OrderToUser_B_index";

-- DropIndex
DROP INDEX "_OrderToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ItemToOrder";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ItemToUser";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_OrderToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" BOOLEAN NOT NULL
);
INSERT INTO "new_Item" ("Image", "id", "price", "stock", "title") SELECT "Image", "id", "price", "stock", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_title_key" ON "Item"("title");
CREATE UNIQUE INDEX "Item_Image_key" ON "Item"("Image");
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "id", "quantity") SELECT "createdAt", "id", "quantity" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
