-- CreateTable
CREATE TABLE "_BasketToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Basket" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToItem_AB_unique" ON "_BasketToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToItem_B_index" ON "_BasketToItem"("B");
