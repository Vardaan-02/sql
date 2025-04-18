/*
  Warnings:

  - You are about to drop the column `Price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Stock_Quantity` on the `Product` table. All the data in the column will be lost.
  - Added the required column `Item_ID` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Purchase_Price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Selling_Price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Price",
DROP COLUMN "Stock_Quantity",
ADD COLUMN     "Batch_Number" TEXT,
ADD COLUMN     "Expiry_Date" TIMESTAMP(3),
ADD COLUMN     "Initial_Stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Item_ID" TEXT NOT NULL,
ADD COLUMN     "Location" TEXT,
ADD COLUMN     "Manufacturer" TEXT,
ADD COLUMN     "Min_Stock_Level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Purchase_Price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "Selling_Price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "Subcategory" TEXT,
ADD COLUMN     "Unit" TEXT;
