/*
  Warnings:

  - A unique constraint covering the columns `[Order_ID]` on the table `Purchase_Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Notes` to the `Purchase_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Order_ID` to the `Purchase_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Payment_Method` to the `Purchase_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Payment_Terms` to the `Purchase_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Shipping_Address` to the `Purchase_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Shipping_Instructions` to the `Purchase_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Shipping_Method` to the `Purchase_Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase_Order" ADD COLUMN     "Delivery_Date" TIMESTAMP(3),
ADD COLUMN     "Notes" TEXT NOT NULL,
ADD COLUMN     "Order_ID" TEXT NOT NULL,
ADD COLUMN     "Payment_Method" TEXT NOT NULL,
ADD COLUMN     "Payment_Terms" TEXT NOT NULL,
ADD COLUMN     "Shipping_Address" TEXT NOT NULL,
ADD COLUMN     "Shipping_Instructions" TEXT NOT NULL,
ADD COLUMN     "Shipping_Method" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_Order_Order_ID_key" ON "Purchase_Order"("Order_ID");
