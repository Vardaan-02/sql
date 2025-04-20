/*
  Warnings:

  - You are about to drop the column `Price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Stock_Quantity` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Item_ID]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Initial_Stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Item_ID` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Min_Stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Purchase_Price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Selling_Price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Unit` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `Category` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Price",
DROP COLUMN "Stock_Quantity",
ADD COLUMN     "Batch_Number" TEXT,
ADD COLUMN     "Initial_Stock" INTEGER NOT NULL,
ADD COLUMN     "Item_ID" TEXT NOT NULL,
ADD COLUMN     "Location" TEXT,
ADD COLUMN     "Manufacturer" TEXT,
ADD COLUMN     "Min_Stock" INTEGER NOT NULL,
ADD COLUMN     "Notes" TEXT,
ADD COLUMN     "Purchase_Price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "Selling_Price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "Subcategory" TEXT,
ADD COLUMN     "Unit" TEXT NOT NULL,
ALTER COLUMN "Category" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_Item_ID_key" ON "Product"("Item_ID");
