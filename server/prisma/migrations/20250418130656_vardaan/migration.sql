/*
  Warnings:

  - You are about to drop the column `Batch_Number` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Initial_Stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Item_ID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Item_Name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Manufacturer` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Min_Stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Notes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Purchase_Price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Selling_Price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Subcategory` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Unit` on the `Product` table. All the data in the column will be lost.
  - Added the required column `Name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_Item_ID_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Batch_Number",
DROP COLUMN "Initial_Stock",
DROP COLUMN "Item_ID",
DROP COLUMN "Item_Name",
DROP COLUMN "Location",
DROP COLUMN "Manufacturer",
DROP COLUMN "Min_Stock",
DROP COLUMN "Notes",
DROP COLUMN "Purchase_Price",
DROP COLUMN "Selling_Price",
DROP COLUMN "Subcategory",
DROP COLUMN "Unit",
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "Stock_Quantity" INTEGER NOT NULL DEFAULT 0;
